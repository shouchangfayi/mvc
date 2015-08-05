using Mvc.Web.Android.Models;
using NapiService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Mvc.Web.Android.Controllers
{
    public class BaseController : Controller
    {
        /// <summary>
        /// MemberService
        /// </summary>
        public NapiService.MemberService _memberService = new NapiService.MemberService();

        /// <summary>
        /// MemberTags
        /// </summary>
        public MemberTagsModel _memberTags = new MemberTagsModel();

        /// <summary>
        /// 初始化
        /// </summary>
        protected override void Initialize(RequestContext requestContext)
        {
            base.Initialize(requestContext);
            var value = WebHelper.GetCookie("USER_FLAG");

            if (!string.IsNullOrEmpty(value))
            {
                value = WebHelper.Decrypt(value);
                var memberTags = WebHelper.Json<MemberTagsModel>(value);

                if (memberTags != null && !string.IsNullOrEmpty(memberTags.Password))
                    _memberTags = WebHelper.Json<MemberTagsModel>(value);
            }
            ViewBag.User = _memberTags;
        }

        /// <summary>
        /// 是否是新用户
        /// </summary>
        /// <returns></returns>
        public bool IsNewMember()
        {
            string key = "MEMBER_FLAG_VALUE";

            string userFlag = WebHelper.GetCookie(key);
            if (userFlag == "1")
                return false;

            bool result = _memberService.IsCharged(_memberTags.ID, this.DeviceNumber);

            if (!result)
                WebHelper.SetCookie(key, "1", 60 * 24 * 900);

            return result;

        }

        /// <summary>
        /// 前往登录
        /// </summary>
        public void Login()
        {
            string returnUrl = Request.Url.OriginalString;

            Response.Redirect("Member?referer=" + HttpUtility.UrlEncode(returnUrl));
        }

        /// <summary>
        /// 设备号
        /// </summary>
        public string DeviceNumber
        {
            get
            {
                //return SiteHelper.DESDecode(WebHelper.GetCookie("AUTH_ID"), CONTENT_KEY);
                return WebHelper.Decrypt(WebHelper.GetCookie("AUTH_ID"));
            }
        }

        /// <summary>
        /// 版本号
        /// </summary>
        public double Version
        {
            get
            {
                return WebHelper.Decrypt(WebHelper.GetCookie("VerXxsy")).To<double>();
            }
        }

        /// <summary>
        /// 设置价格(2015-01-01 开始注册的用户按签字5分)
        /// </summary>
        /// <param name="oldPrice"></param>
        /// <returns></returns>
        //public int SetPayment(int oldPrice)
        //{

        //    int price = oldPrice;

        //    DateTime startTime = DateTime.Parse(SiteSettings.ChangePriceDate);
        //    DateTime setTime = DateTime.Parse("2015-01-01 00:00:00");
        //    DateTime now = DateTime.Now;

        //    if (now >= startTime)
        //    {

        //        int newPrice = (int)((oldPrice / 1.5) * 2.5);

        //        if (ViewBag.UserID == 0)
        //            return newPrice;

        //        if (SiteSettings.MaxUserId > 0)
        //        {

        //            if (ViewBag.UserID > SiteSettings.MaxUserId)
        //                price = newPrice;

        //        }
        //        else
        //        {

        //            int source = 0;
        //            if (now < setTime.AddMinutes(5))
        //                source = 1;

        //            NapiService.Model.Member member = _memberService.GetById(ViewBag.UserID);
        //            DateTime addDate = member.CreateTime;

        //            if (addDate >= setTime)
        //                price = newPrice;

        //        }

        //    }

        //    return price;
        //}

        /// <summary>
        /// 判断是否是指定时间外注册的用户
        /// </summary>
        /// <returns></returns>
        //public bool IsSpecifiedTimeMember()
        //{

        //    bool result = false;

        //    DateTime startTime = DateTime.Parse(SiteSettings.ChangePriceDate);
        //    DateTime setTime = DateTime.Parse("2015-01-01 00:00:00");
        //    DateTime now = DateTime.Now;

        //    if (now >= startTime)
        //    {

        //        if (ViewBag.UserID == 0)
        //            return true;

        //        if (SiteSettings.MaxUserId > 0)
        //        {

        //            if (ViewBag.UserID > SiteSettings.MaxUserId)
        //                result = true;

        //        }
        //        else
        //        {

        //            int source = 0;
        //            if (now < setTime.AddMinutes(5))
        //                source = 1;

        //            NapiService.Model.Member member = _memberService.GetById(ViewBag.UserID);
        //            DateTime addDate = member.CreateTime;

        //            if (addDate >= setTime)
        //                result = true;

        //        }

        //    }

        //    return result;
        //}
    }

    /// <summary>
    /// Nxp专用字典
    /// </summary>
    /// <typeparam name="TKey">键类型</typeparam>
    /// <typeparam name="TValue">值类型</typeparam>
    public partial class NxpDictionary<TKey, TValue> : Dictionary<TKey, TValue>
    {

        /// <summary>
        /// 获取值
        /// </summary>
        /// <param name="key">键名</param>
        /// <param name="defValue">默认值</param>
        /// <returns>值</returns>
        public TValue Get(TKey key, TValue defValue = default(TValue))
        {
            if (this.ContainsKey(key))
                return this[key];
            return defValue;
        }

        /// <summary>
        /// 获取
        /// </summary>
        /// <param name="key">键名</param>
        /// <param name="defValue">默认值</param>
        /// <returns>int</returns>
        public int GetInt32(TKey key, int defValue = default(int))
        {
            TValue value = Get(key);
            return value.To<int>(defValue);
        }

        /// <summary>
        /// 获取bool
        /// 0-false
        /// 1-true
        /// </summary>
        /// <param name="key">键名</param>
        /// <returns>bool</returns>
        public bool GetBoolean(TKey key)
        {
            TValue value = Get(key);
            return (value.To<int>() == 1);
        }

        /// <summary>
        /// 获取时间
        /// </summary>
        /// <param name="key">键名</param>
        /// <param name="defValue">默认值</param>
        /// <returns>DateTime</returns>
        public DateTime GetDateTime(TKey key, DateTime defValue = default(DateTime))
        {
            TValue value = Get(key);
            return value.To<DateTime>(defValue);
        }

        /// <summary>
        /// 获取double
        /// </summary>
        /// <param name="key">键名</param>
        /// <param name="defValue">默认值</param>
        /// <returns>double</returns>
        public double GetDouble(TKey key, double defValue = default(int))
        {
            TValue value = Get(key);
            return value.To<double>(defValue);
        }

        /// <summary>
        /// 获取字符串
        /// </summary>
        /// <param name="key">键名</param>
        /// <param name="defValue">默认值</param>
        /// <returns>string</returns>
        public string GetString(TKey key, string defValue = default(string))
        {
            TValue value = Get(key);
            return value.To<string>(defValue);
        }
    }
}
