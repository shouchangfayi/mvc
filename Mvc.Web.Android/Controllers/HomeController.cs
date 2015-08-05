using Mvc.Web.Android.Helper;
using Mvc.Web.Android.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mvc.Web.Android.Controllers
{
    public class HomeController : BaseController
    {
        /// <summary>
        /// 首页入口
        /// </summary>
        public ActionResult Index()
        {
            return RedirectToAction("Index","Book");
        }
    }
}
