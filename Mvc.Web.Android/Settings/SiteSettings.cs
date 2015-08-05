using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Mvc.Web.Android.Settings
{
    /// <summary>
    /// 网站设置信息
    /// </summary>
    public static class SiteSettings
    {
        /// <summary>
        /// 客户端免费作品功能
        /// </summary>
        public static int FreeBookON = ConfigurationManager.AppSettings["FreeBookON"].To<int>();
        /// <summary>
        /// 渠道号
        /// </summary>
        public static int SubscribeChannel = ConfigurationManager.AppSettings["SubscribeChannel"].To<int>(1);
        /// <summary>
        /// 充值渠道号
        /// </summary>
        public static Dictionary<string, string> PayChannel
        {
            get
            {
                var channels = new Dictionary<string, string>();
                var items = ConfigurationManager.AppSettings["PayChannels"].To<string>(string.Empty).Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries);
                foreach (var item in items)
                {
                    var arr = item.Split(new[] { "|" }, StringSplitOptions.RemoveEmptyEntries);
                    if (arr.Length == 2)
                    {
                        channels.Add(arr[0], arr[1]);
                    }
                }
                return channels;
            }
        }
    }
}