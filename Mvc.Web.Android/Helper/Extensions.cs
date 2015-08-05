using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Security;

namespace Mvc.Web.Android
{
    /// <summary>
    /// 公共扩展
    /// </summary>
    public static class Extensions
    {
        /// <summary>
        /// 判断一个T?是否是空值或者是默认值
        /// </summary>
        /// <typeparam name="T">数据类型</typeparam>
        /// <param name="source">源数据</param>
        /// <returns>book</returns>
        public static bool IsNullOrDefault<T>(this T? source) where T : struct
        {
            return default(T).Equals(
                source.GetValueOrDefault());
        }

        /// <summary>
        /// 数据转换
        /// </summary>
        public static T To<T>(this object source, T value = default(T))
        {
            if (source != null
                    && !(source is DBNull))
            {
                try
                {
                    value = (T)Convert.ChangeType(source, typeof(T));
                }
                catch
                { }
            }
            return value;
        }

        /// <summary>
        /// MD5加密
        /// </summary>
        /// <param name="source"></param>
        /// <param name="bit">位数如果为16取中间16位</param>
        /// <returns>String</returns>
        public static string MD5(this string source, int bit = 32)
        {
            var result = FormsAuthentication.HashPasswordForStoringInConfigFile(source, "md5");
            if (bit == 16)
                result = result.Substring(8, 16);
            return result.ToLower();
        }

        /// <summary>
        /// 数据转换
        /// </summary>
        public static string ShortIntro(this string str, int len = 30)
        {
            if (!string.IsNullOrWhiteSpace(str))
            {
                var pattern = @"<[^>]+>|\s+|http[a-z0-9\\\/\&\?\:\.\%]+|\&[\w\d]{2,6}\;|\*+";
                str = Regex.Replace(str, pattern, "", RegexOptions.Compiled | RegexOptions.Multiline | RegexOptions.IgnoreCase);
                if (str.Length > len)
                {
                    str = str.Substring(0, len) + "...";
                }
            }
            return str;
        }

        /// <summary>
        /// 简写万元
        /// </summary>
        public static string ToWan(this int num)
        {
            string value = string.Empty;
            if (num > 10000)
            {
                value = int.Parse((num / 10000).ToString()).ToString() + "万";
            }
            else
                value = num.ToString();
            return value;
        }
    }
}
