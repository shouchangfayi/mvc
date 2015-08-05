using NapiService;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mvc.Web.Android
{
    /// <summary>
    /// 用户登陆验证
    /// </summary>
    public partial class LoginAuthorizeAttribute : AuthorizeAttribute
    {
        private const string DEFAULT_LOGIN_URL = "/Member/Login";
        private const string DEFAULT_COOKIE_KEY = "USER_FLAG";
        private string _Url = string.Empty;
        private string _Key = string.Empty;

        public LoginAuthorizeAttribute()
        {
            _Url = ConfigurationManager.AppSettings["LoginUrl"];
            _Key = ConfigurationManager.AppSettings["LoginKey"];

            if (string.IsNullOrEmpty(_Url))
            {
                _Url = DEFAULT_LOGIN_URL;
            }

            if (string.IsNullOrEmpty(_Key))
            {
                _Key = DEFAULT_COOKIE_KEY;
            }
        }

        public LoginAuthorizeAttribute(string url)
            : this()
        {
            _Url = url;
        }

        public LoginAuthorizeAttribute(string url, string key)
            : this(url)
        {
            _Key = key;
        }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            if (filterContext.HttpContext == null)
            {
                throw new ArgumentNullException("filterContext");
            }
            else
            {
                if (!filterContext.ActionDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true) && 
                    !filterContext.ActionDescriptor.ControllerDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true))
                {
                    string value = string.Empty;
                    HttpCookie cookie = filterContext.HttpContext.Request.Cookies[_Key];
                    if (cookie != null)
                    {
                        value = WebHelper.Decrypt(cookie.Value);
                    }

                    if (string.IsNullOrWhiteSpace(value))
                    {
                        filterContext.HttpContext.Response.Redirect(_Url + "?referer=" + filterContext.HttpContext.Request.RawUrl);
                        //filterContext.Result = new RedirectResult(_Url + "?referer=" + filterContext.HttpContext.Request.RawUrl);
                    }
                }
            }
        }
    }
}