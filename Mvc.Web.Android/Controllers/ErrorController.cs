using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mvc.Web.Android.Controllers
{
    public class ErrorController : Controller
    {
        public ActionResult Error(string errorUrl = "")
        {
            if (errorUrl.Length > 0)
            {
                //SmsManager.Send(errorUrl, string.Empty);
            }

            return View();
        }

        public ActionResult NotFound(string err = "")
        {
            ViewBag.NotFoundMessage = "您所访问的页面没找到！";
            if (!string.IsNullOrEmpty(err))
            {
                ViewBag.NotFoundMessage = err;
            }
            return View();
        }
    }
}
