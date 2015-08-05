using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mvc.Web.Android.Models
{
    /// <summary>
    /// Http响应结果 
    /// </summary>
    public partial class HttpResponseModel
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
        public Object Data = default(Object);
        /// <summary>
        /// 附加数据
        /// </summary>
        public Object Attachments = default(Object);
    }
}