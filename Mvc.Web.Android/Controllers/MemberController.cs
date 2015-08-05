using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mvc.Web.Android.Controllers
{
    public class MemberController : Controller
    {
        /// <summary>
        /// 用户登录
        /// <para>@referer:跳转Url</para>
        /// </summary>
        public ActionResult Login(string referer)
        {
            if (!string.IsNullOrWhiteSpace(referer))
                ViewBag.RefererUrl = referer;
            return View();
        }

        /// <summary>
        /// 用户注册
        /// <para>@referer:跳转Url</para>
        /// </summary>
        public ActionResult Register(string referer)
        {
            if (!string.IsNullOrWhiteSpace(referer))
                ViewBag.RefererUrl = referer;
            return View();
        }

        /// <summary>
        /// 找回密码
        /// <para>@referer:跳转Url</para>
        /// </summary>
        public ActionResult FindPassword(string referer)
        {
            if (!string.IsNullOrWhiteSpace(referer))
                ViewBag.RefererUrl = referer;
            return View();
        }

        public MemberController()
        {
            ViewBag.RefererUrl = "/";
        }
    }
}