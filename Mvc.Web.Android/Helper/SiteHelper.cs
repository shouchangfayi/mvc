using Mvc.Web.Android.Settings;
using NapiService;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace Mvc.Web.Android.Helper
{
    /// <summary>
    /// 网站常用工具
    /// </summary>
    public static class SiteHelper
    {
        /// <summary>
        /// 获取充值渠道号
        /// </summary>
        /// <param name="order">订单号</param>
        /// <returns>String</returns>
        public static string GetPayChannel(object order)
        {
            var channelName = "未知渠道";
            var arr = order.To<string>(string.Empty).Split(new[] { "_" }, StringSplitOptions.RemoveEmptyEntries);
            if (arr.Length > 0)
            {
                var number = arr[arr.Length - 1];
                if (SiteSettings.PayChannel.Keys.Contains(number))
                    channelName = SiteSettings.PayChannel[number];
            }
            return channelName;
        }

        public static string IntroFilter(string intro)
        {
            var str = intro;
            str = Regex.Replace(str, "<p>", "<br>", RegexOptions.IgnoreCase | RegexOptions.Multiline);
            var pattern = @"http[^\u4e00-\u9fa5]+|\&.*?\;";
            var regex = new Regex(pattern, RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.Compiled);
            str = regex.Replace(str, "");
            return str;
        }

        public static string GetEncryptDictionary(string key)
        {

            string s = "0123456789ABCDEF";

            if (string.IsNullOrEmpty(key)) key = "";
            string str = key.MD5().ToUpper();

            List<string> list = str.ToCharArray()
                .Distinct()
                .Select(o => o.ToString())
                .ToList();

            if (list.Count() < 16)
            {
                foreach (char c in s.ToCharArray())
                {
                    if (!list.Contains(c.ToString()))
                    {
                        list.Add(c.ToString());
                    }
                    if (list.Count >= 16)
                    {
                        break;
                    }
                }
            }

            return string.Join("", list);
        }

        /// <summary>
        /// 加密
        /// </summary>
        /// <param name="original">被加密字符串</param>
        /// <param name="key">加密密钥</param>
        /// <returns></returns>
        public static string XEncrypt(string original, string key)
        {

            string dic = GetEncryptDictionary(key);

            StringBuilder str = new StringBuilder();

            if (!string.IsNullOrEmpty(original))
            {

                char[] chars = original.ToCharArray();
                string bytes = string.Join("", chars.Select(o => Convert.ToString(o, 2).PadLeft(16, '0')));

                for (int i = 0; i < bytes.Length; i += 4)
                {
                    int index = Convert.ToInt32(bytes.Substring(i, 4), 2);
                    str.Append(dic[index].ToString());
                }
            }

            return str.ToString();
        }

        /// <summary>
        /// 解密
        /// </summary>
        /// <param name="encrypted"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string XDecrypt(string encrypted, string key)
        {

            string dic = GetEncryptDictionary(key);

            if (string.IsNullOrEmpty(encrypted))
            {
                return "";
            }

            StringBuilder str = new StringBuilder();

            foreach (char ch in encrypted.ToCharArray())
            {
                int index = dic.IndexOf(ch);
                string bytes = Convert.ToString(index, 2).PadLeft(4, '0');
                str.Append(bytes);
            }

            string s = str.ToString();
            str.Clear();

            for (int i = 0; i < s.Length; i += 16)
            {
                char ch = (char)Convert.ToInt32(s.Substring(i, 16), 2);
                str.Append(ch.ToString());
            }

            return str.ToString();
        }

        /// <summary>
        /// DES解密
        /// </summary>
        /// <param name="str">待解密字符串</param>
        /// <param name="key">解密密钥</param>
        /// <returns></returns>
        public static string DESDecode(string str, string key)
        {

            string value = string.Empty;
            str = str ?? string.Empty;

            try
            {
                DESCryptoServiceProvider provider = new DESCryptoServiceProvider();
                byte[] keyBytes = Encoding.UTF8.GetBytes(key.MD5().ToLower().Substring(8, 8));
                provider.Key = keyBytes;
                provider.IV = keyBytes;
                byte[] buffer = new byte[str.Length / 2];
                for (int i = 0; i < (str.Length / 2); i++)
                {
                    int num2 = Convert.ToInt32(str.Substring(i * 2, 2), 0x10);
                    buffer[i] = (byte)num2;
                }
                MemoryStream stream = new MemoryStream();
                CryptoStream stream2 = new CryptoStream(stream, provider.CreateDecryptor(), CryptoStreamMode.Write);
                stream2.Write(buffer, 0, buffer.Length);
                stream2.FlushFinalBlock();
                stream.Close();
                value = Encoding.UTF8.GetString(stream.ToArray());
            }
            catch { }

            return value;
        }


        /// <summary>
        /// DES加密
        /// </summary>
        /// <param name="str">待加密字符串</param>
        /// <param name="key">加密密钥</param>
        /// <returns>加密后的代码</returns>        
        public static string DESEncode(string str, string key)
        {

            string value = string.Empty;

            try
            {
                DESCryptoServiceProvider provider = new DESCryptoServiceProvider();
                byte[] keyBytes = Encoding.UTF8.GetBytes(key.MD5().ToLower().Substring(8, 8));
                provider.Key = keyBytes;
                provider.IV = keyBytes;
                byte[] bytes = Encoding.UTF8.GetBytes(str);
                MemoryStream stream = new MemoryStream();
                CryptoStream stream2 = new CryptoStream(stream, provider.CreateEncryptor(), CryptoStreamMode.Write);
                stream2.Write(bytes, 0, bytes.Length);
                stream2.FlushFinalBlock();
                StringBuilder builder = new StringBuilder();
                foreach (byte num in stream.ToArray())
                {
                    builder.AppendFormat("{0:X2}", num);
                }
                stream.Close();
                value = builder.ToString();

            }
            catch
            { }
            return value;
        }

        /// <summary>
        /// 发送服务请求，返回对象
        /// </summary>
        /// <typeparam name="T">对象类型</typeparam>
        /// <param name="requestData_Json">请求的参数(Json格式)</param>
        /// <param name="defaultValue">获取失败默认值</param>
        /// <returns>T</returns>
        public static T GetServices<T>(string requestData_Json, T defaultValue = default(T))
        {
            T value = defaultValue;
            try
            {
                string urlData = HttpUtility.UrlEncode(requestData_Json);
                //string url = "http://napi.xxsy.net/services2?" + urlData;
                string url = "http://napi.xxsy.net/services?requestData=" + urlData;

                string service_back = WebHelper.QuickGet(url);

                HttpResponseModel<T> model = WebHelper.Json<HttpResponseModel<T>>(service_back);

                if(model.Code == 0)
                    value = model.Data;
            }
            catch { }
            return value;
        }


        /// <summary>
        /// Http响应结果 
        /// </summary>
        public partial class HttpResponseModel<T>
        {
            /// <summary>
            /// 响应Code
            /// </summary>
            public int Code = 0;
            /// <summary>
            /// 响应信息
            /// </summary>
            public string Message = string.Empty;
            /// <summary>
            /// 响应数据
            /// </summary>
            public T Data = default(T);
            /// <summary>
            /// 附加数据
            /// </summary>
            public object Attachments = default(Object);
        }

        /// <summary>
        /// 通用调用方法1
        /// </summary>
        /// <typeparam name="T">T</typeparam>
        /// <typeparam name="TAttach">TAttach</typeparam>
        /// <param name="httpParameters">Parameters参数字典</param>
        /// <param name="attach">Attements</param>
        /// <returns>T</returns>
        public static T InvokeService<T, TAttach>(Dictionary<string, object> httpParameters, out TAttach attach)
        {

            if (!httpParameters.ContainsKey("method"))
                throw new Exception("method");

            T value = default(T);
            attach = default(TAttach);

            string host = "http://napi.xxsy.net/services2?";
            StringBuilder sb = new StringBuilder();
            foreach (var k in httpParameters.Keys)
                sb.AppendFormat("{0}={1}&", k, HttpUtility.UrlEncode(httpParameters[k].To<string>(string.Empty)));

            string sign = (httpParameters["method"] + "vage~244@$9234sdfnsdf~!").MD5();
            sb.AppendFormat("sign={0}", sign);
            host += sb.ToString();
            sb.Clear();

            string responseData = WebHelper.QuickGet(host);
            var httpModel = WebHelper.Json<HttpResModel<T, TAttach>>(responseData);
            if (httpModel != null)
            {
                value = httpModel.Data;
                attach = httpModel.Attachments;
            }

            return value;
        }

        /// <summary>
        /// 通用调用方法2
        /// </summary>
        /// <typeparam name="T">T</typeparam>
        /// <param name="httpParameters">Parameters参数字典</param>
        /// <returns>T</returns>
        public static T InvokeService<T>(Dictionary<string, object> httpParameters)
        {
            Object attch;
            return InvokeService<T, Object>(httpParameters, out attch);
        }

        /// <summary>
        /// 过渡对象
        /// </summary>
        /// <typeparam name="T">T</typeparam>
        /// <typeparam name="TAttach">TAttach</typeparam>
        public class HttpResModel<T, TAttach>
        {
            /// <summary>
            /// 响应Code
            /// </summary>
            public int Code = 0;
            /// <summary>
            /// 响应信息
            /// </summary>
            public string Message = string.Empty;
            /// <summary>
            /// 响应数据
            /// </summary>
            public T Data = default(T);
            /// <summary>
            /// 附加数据
            /// </summary>
            public TAttach Attachments = default(TAttach);
        }
    }
}

