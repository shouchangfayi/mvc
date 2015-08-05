using Mvc.Web.Android.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mvc.Web.Android.Models
{

    /// <summary>
    /// Http请求对象
    /// </summary>
    public class HttpRequestArgsModel
    {
        /// <summary>
        /// 创建HttpRequestArgsModel
        /// </summary>
        public HttpRequestArgsModel()
        {
            this.Method = string.Empty;
            this.Parameters = new NxpDictionary<string, object>();
            this.Date = DateTime.Now;
        }

        /// <summary>
        /// 请求方法
        /// </summary>
        public string Method { get; set; }

        /// <summary>
        /// 请求参数
        /// </summary>
        public NxpDictionary<string, object> Parameters { get; set; }

        /// <summary>
        /// 请求时间
        /// </summary>
        public DateTime Date { get; set; }

    }
}