using NapiService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Security;

namespace Mvc.Web.Android.Helper
{
    /// <summary>
    /// 短信发送支持
    /// </summary>
    public static class SmsHelper
    {
        /// <summary>
        /// 短信接口路径
        /// </summary>
        private static string HOST = "http://link.xxsy.net/svc/sms.aspx?mobile={0}&message={1}&token={2}";

        /// <summary>
        /// 短信接口路径
        /// </summary>
        private static string HOST2 = "http://link.xxsy.net/svc/sms.aspx?mobile={0}&message={1}&token={2}&ip={3}&forwhat={4}";

        /// <summary>
        /// 发送信息
        /// </summary>
        /// <param name="mebile">手机号</param>
        /// <param name="message">发送内容(必须符合模板约定)</param>
        /// <returns>bool成功返回true否则false</returns>
        public static bool Send(string mobile, string message)
        {
            var value = false;

            var secret = "d6e3ea3679d28199c60b61dfeba204ac";
            var token = FormsAuthentication.HashPasswordForStoringInConfigFile(
                string.Format("xxsynet{0}{1}{2}", mobile, DateTime.Now.ToString("yyyyMMdd"), secret), "MD5").ToLower();

            using (var client = new WebClient())
            {

                var temp = client.DownloadString(string.Format(HOST, mobile, message, token));
                var res = 0;
                int.TryParse(temp, out res);
                value = (res > 0);
            }

            return value;
        }

        /// <summary>
        /// 发送短信
        /// </summary>
        /// <param name="mobile">手机号</param>
        /// <param name="message">信息</param>
        /// <param name="forwhat">用途</param>
        /// <returns>bool</returns>
        public static bool Send(string mobile, string message, string forwhat)
        {
            var value = false;

            var secret = "d6e3ea3679d28199c60b61dfeba204ac";
            var token = FormsAuthentication.HashPasswordForStoringInConfigFile(
                string.Format("xxsynet{0}{1}{2}", mobile, DateTime.Now.ToString("yyyyMMdd"), secret), "MD5").ToLower();

            using (var client = new WebClient())
            {
                var temp = client.DownloadString(string.Format(HOST2, mobile, HttpUtility.UrlEncode(message), token, WebHelper.IP(), HttpUtility.UrlEncode(forwhat)));
                var res = 0;
                int.TryParse(temp, out res);
                value = (res > 0);
            }

            return value;
        }
    }
}