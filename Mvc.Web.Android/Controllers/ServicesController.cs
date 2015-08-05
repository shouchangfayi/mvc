using Mvc.Web.Android.Helper;
using Mvc.Web.Android.Models;
using Mvc.Web.Android.Settings;
using NapiService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace Mvc.Web.Android.Controllers
{
    public class ServicesController : BaseController
    {
        #region MyRegion

        //private MemberService _memberService;

        public ServicesController()
        {
            //_memberService = new MemberService();
        }
        #endregion

        /// <summary>
        /// 回调函数名
        /// </summary>
        string _NxpCallback = string.Empty;

        /// <summary>
        /// 接口入口
        /// <para>@requestData：json字符串</para>
        /// <para>@nxpCallback：JSONP回调函数名</para>
        /// </summary>
        public ActionResult Index(string requestData = "", string nxpCallback = "")
        {
            this._NxpCallback = nxpCallback;
            if (!string.IsNullOrEmpty(requestData))
            {
                var data = WebHelper.Json<HttpRequestArgsModel>(requestData);
                if (data != null)
                {
                    switch (data.Method.ToLower())
                    {
                        #region 用户相关
                        //用户登陆
                        case "user_login": return Login(data.Parameters);
                        // 用户状态检测
                        case "user_check": return CheckUser(data.Parameters);
                        // 发送注册验证码
                        case "user_sendregistercode": return SendRegisterCode(data.Parameters);
                        // 发送找回密码验证码
                        case "user_sendfindpasswordcode": return SendFindPasswordCode(data.Parameters);
                        // 发送绑定手机验证码
                        case "user_sendbindingcode": return SendBindingCode(data.Parameters);
                        // 发送解绑手机验证码
                        case "user_sendunbindingcode": return SendUnBindingCode(data.Parameters);
                        // 找回密码
                        case "user_findpassword": return FindPassword(data.Parameters);
                        // 获取绑定信息
                        case "user_getbinding": return GetBinding(data.Parameters);
                        // 绑定手机号
                        case "user_binding": return MemberBinding(data.Parameters);
                        // 手机解除绑定
                        case "user_unbinding": return MemberUnbinding(data.Parameters);
                        #endregion
                    }
                }
            }
            return View();
        }

        /// <summary>
        /// 发送解绑手机验证码
        /// <para>@mobile:手机号</para>
        /// <para>@rv:验证码</para>
        /// </summary>
        private ActionResult SendUnBindingCode(NxpDictionary<string, object> nxpDictionary)
        {
            var mobile = nxpDictionary.GetString("mobile", string.Empty);
            var userid = nxpDictionary.GetInt32("userid", 0);

            var member = _memberService.GetById(userid);
            if (member.Mobile != mobile)
            {
                return LogError("请输入正确的手机号");
            }

            if (string.IsNullOrWhiteSpace(member.Mobile))
            {
                return LogError("手机号已解除绑定");
            }

            var code = new Random().Next(1000, 9999);

            var res = _memberService.SendSmsUnbindingMobileMessage(mobile, code.To<string>());

            if (!res)
            {
                return LogError("发送失败或使用次数已满");
            }

            //验证码写入Session
            Session["UNBINDING_CODE_" + WebHelper.Md5(mobile)] = code;
            Session["UNBINDING_CODE_COUNT_" + WebHelper.Md5(mobile)] = 0;

            return ShowResult("验证码已发送");
        }

        /// <summary>
        /// 发送绑定手机验证码
        /// <para>@mobile:手机号</para>
        /// <para>@rv:验证码</para>
        /// </summary>
        private ActionResult SendBindingCode(NxpDictionary<string, object> nxpDictionary)
        {
            var mobile = nxpDictionary.GetString("mobile", string.Empty);

            var rv = nxpDictionary.GetString("rv", string.Empty);
            if (string.IsNullOrEmpty(rv) || rv != Session["VALIDATE_CODE"].To<string>(string.Empty))
            {
                return LogError("输入的答案不正确");
            }

            if (!Regex.IsMatch(mobile, "\\d{11}"))
            {
                return LogError("非法手机号");
            }

            if (_memberService.GetByMobile(mobile) != null)
            {
                return LogError("手机号已被绑定");
            }

            var code = new Random().Next(1000, 9999);

            var res = _memberService.SendSmsBindingMobileMessage(mobile, code.To<string>());

            if (!res)
            {
                return LogError("发送失败或使用次数已满");
            }

            //验证码写入Session
            Session["BINDING_CODE_" + WebHelper.Md5(mobile)] = code;
            Session["BINDING_CODE_COUNT_" + WebHelper.Md5(mobile)] = 0;

            return ShowResult("验证码已发送");
        }

        /// <summary>
        /// 手机解除绑定
        /// <para>@userid:用户Id</para>
        /// </summary>
        private ActionResult MemberUnbinding(NxpDictionary<string, object> nxpDictionary)
        {
            var userid = nxpDictionary.GetInt32("userid", 0);
            var code = nxpDictionary.GetString("code", string.Empty);
            var mobile = nxpDictionary.GetString("mobile", string.Empty);

            if (!Security(userid))
                return LogError("验证用户失败请重新登陆！", -1);

            int errorNumber = Session["UNBINDING_CODE_COUNT_" + WebHelper.Md5(mobile)].To<int>();
            if (errorNumber >= 3)
            {
                return LogError("验证码不正确");
            }

            var myCode = Session["UNBINDING_CODE_" + WebHelper.Md5(mobile)].To<string>("");
            if (code == "" || code != myCode)
            {
                Session["UNBINDING_CODE_COUNT_" + WebHelper.Md5(mobile)] = errorNumber++;
                return LogError("验证码不正确");
            }

            var member = _memberService.GetById(userid);
            if (member == null || member.Id == 0)
                return LogError("用户不存在");

            if (member.IsBindingMobile == 0)
            {
                return LogError("用户已解除绑定");
            }

            var httpModel = _memberService.UpdateMobileHttpModel(userid, mobile, 0);

            if (httpModel.Code == 0)
                return ShowResult(httpModel.Data, httpModel.Attachments);
            else
                return LogError(httpModel.Message);
        }

        /// <summary>
        /// 绑定手机号
        /// <para>@userid:用户Id</para>
        /// <para>@mobile:手机号</para>
        /// <para>@code:验证码</para>
        /// </summary>
        private ActionResult MemberBinding(NxpDictionary<string, object> nxpDictionary)
        {
            var userid = nxpDictionary.GetInt32("userid", 0);
            var mobile = nxpDictionary.GetString("mobile", string.Empty);
            var code = nxpDictionary.GetString("code", string.Empty);

            if (!Security(userid))
                return LogError("验证用户失败请重新登陆！", -1);

            int errorNumber = Session["BINDING_CODE_COUNT_" + WebHelper.Md5(mobile)].To<int>();
            if (errorNumber >= 3)
            {
                return LogError("验证码不正确");
            }

            var myCode = Session["BINDING_CODE_" + WebHelper.Md5(mobile)].To<string>("");
            if (code == "" || code != myCode)
            {
                Session["BINDING_CODE_COUNT_" + WebHelper.Md5(mobile)] = errorNumber++;
                return LogError("验证码不正确");
            }

            var member = _memberService.GetById(userid);

            if (member.IsBindingMobile == 1)
            {
                return LogError("用户已绑定");
            }

            var httpModel = _memberService.UpdateMobileHttpModel(userid, mobile, 1);

            if (httpModel.Code == 0)
                return ShowResult(httpModel.Data, httpModel.Attachments);
            else
                return LogError(httpModel.Message);
        }

        /// <summary>
        /// 获取绑定信息
        /// <para>@userid:用户Id</para>
        /// </summary>
        private ActionResult GetBinding(NxpDictionary<string, object> nxpDictionary)
        {
            var userid = nxpDictionary.GetInt32("userid", 0);
            if (!Security(userid))
                return LogError("验证用户失败请重新登陆！", -1);

            var member = _memberService.GetById(userid);

            return ShowResult(member.IsBindingMobile, !string.IsNullOrEmpty(member.Mobile)
                    ? string.Format("你已绑定手机号为：{0}***{1}", member.Mobile.Substring(0, 4), member.Mobile.Substring(member.Mobile.Length - 3))
                    : "");
        }

        /// <summary>
        /// 用户状态检测
        /// <para>@userid:用户Id</para>
        /// </summary>
        private ActionResult CheckUser(NxpDictionary<string, object> nxpDictionary)
        {
            int userid = nxpDictionary.GetInt32("userid", 0);
            var member = _memberService.GetById(userid);
            int value = 0;
            if(member != null)
                value = member.Status;

            return ShowResult(value);
        }

        /// <summary>
        /// 找回密码
        /// <para>@username:用户名</para>
        /// <para>@verifycode:验证码</para>
        /// <para>@userpass:用户密码</para>
        /// </summary>
        private ActionResult FindPassword(NxpDictionary<string, object> nxpDictionary)
        {
            var userName = nxpDictionary.GetString("username", string.Empty);
            var verifyCode = nxpDictionary.GetString("verifycode", string.Empty);
            var userPass = nxpDictionary.GetString("userpass", string.Empty);

            if (userPass.Length < 6)
            {
                return LogError("密码不能少于6个字符");
            }

            int errorNumber = Session["FINDPASSWORD_CODE_COUNT_" + WebHelper.Md5(userName)].To<int>();
            if (errorNumber >= 3)
            {
                return LogError("验证码不正确");
            }

            var myCode = Session["FINDPASSWORD_CODE_" + WebHelper.Md5(userName)].To<string>("");
            if (verifyCode == "" || verifyCode != myCode)
            {
                Session["FINDPASSWORD_CODE_COUNT_" + WebHelper.Md5(userName)] = errorNumber + 1;
                return LogError("验证码不正确");
            }

            var member = _memberService.GetByName(userName);
            if (member == null)
            {
                return LogError("用户名不存在或手机未绑定");
            }

            var httpModel = _memberService.UpdatePasswordHttpModel(userName, userPass);

            if (httpModel.Code == 0)
            {
                return Login(new NxpDictionary<string, object>
                {
                    {"username",userName},
                    {"userpassword",userPass}
                });
            }
            else
            {
                return LogError("修改密码失败");
            }
        }

        /// <summary>
        /// 发送找回密码验证码
        /// <para>@username:用户名</para>
        /// <para>@rv:验证码</para>
        /// </summary>
        private ActionResult SendFindPasswordCode(NxpDictionary<string, object> nxpDictionary)
        {
            var userName = nxpDictionary.GetString("username", string.Empty);

            var rv = nxpDictionary.GetString("rv", string.Empty);
            if (string.IsNullOrEmpty(rv) || rv != Session["VALIDATE_CODE"].To<string>(string.Empty))
            {
                return LogError("输入的答案不正确");
            }

            var member = _memberService.GetByName(userName);
            if (member == null)
            {
                return LogError("用户名不存在");
            }

            if (member.IsBindingMobile != 1)
            {
                return LogError("用户未绑定手机号");
            }

            if (member.Status != 0)
            {
                return LogError("用户账号被冻结");
            }

            var code = new Random().Next(1000, 9999);

            var res = _memberService.SendSmsRegisterMessage(member.Mobile, code.To<string>());

            if (!res)
            {
                return LogError("发送失败或使用次数已满");
            }

            //验证码写入Session
            Session["FINDPASSWORD_CODE_" + WebHelper.Md5(userName)] = code;
            Session["FINDPASSWORD_CODE_COUNT_" + WebHelper.Md5(userName)] = 0;

            return ShowResult("验证码已发送");
        }

        /// <summary>
        /// 发送注册验证码
        /// <para>@mobile:手机</para>
        /// <para>@rv:验证码</para>
        /// </summary>
        private ActionResult SendRegisterCode(NxpDictionary<string, object> nxpDictionary)
        {
            var mobile = nxpDictionary.GetString("mobile", string.Empty);;
            var rv = nxpDictionary.GetString("rv", string.Empty);

            if (string.IsNullOrEmpty(rv) || rv != Session["VALIDATE_CODE"].To<string>(string.Empty))
            {
                return LogError("输入的答案不正确");
            }

            if (!Regex.IsMatch(mobile, "\\d{11}"))
            {
                return LogError("非法手机号");
            }

            var member = _memberService.GetByName(mobile);
            if (member != null && member.Id > 0)
            {
                return LogError("手机号已存在");
            }

            var tempMember = _memberService.GetByMobile(mobile);
            if (tempMember != null && tempMember.Id > 0)
            {
                return LogError("该手机号已被其他账号绑定");
            }

            var code = new Random().Next(1000, 9999);

            var res = _memberService.SendSmsRegisterMessage(mobile, code.To<string>());

            if (!res)
            {
                return LogError("发送失败或使用次数已满");
            }

            //验证码写入Session
            Session["REGISTER_CODE_" + WebHelper.Md5(mobile)] = code;
            Session["REGISTER_CODE_COUNT_" + WebHelper.Md5(mobile)] = 0;

            return ShowResult("成功发送了验证码");
        }

        /// <summary>
        /// 用户登录
        /// <para>@username:用户名</para>
        /// <para>@userpassword:用户密码</para>
        /// <para>@imei:设备号</para>
        /// <para>@devicetype:设备类型</para>
        /// </summary>
        private ActionResult Login(NxpDictionary<string, object> nxpDictionary)
        {
            var userName = nxpDictionary.GetString("username", string.Empty);
            var userPass = nxpDictionary.GetString("userpassword", string.Empty);

            var session = string.Empty;
            // 20140707添加
            var imei = nxpDictionary.GetString("imei", string.Empty);
            var deviceType = nxpDictionary.GetString("devicetype", string.Empty);

            var httpModel = _memberService.LoginHttpModel(userName, userPass, SiteSettings.SubscribeChannel);
            var member = httpModel.Data;

            if (httpModel.Code != 0)
            {
                return LogError(httpModel.Message);
            }

            string attachments = WebHelper.Json(new { Id = member.Id, Name = member.Name, Password = member.Password });
            attachments = WebHelper.Encrypt(attachments);

            int expires = 999 * 24 * 60;

            WebHelper.SetCookie("Session_Code", httpModel.Attachments, expires);
            WebHelper.SetCookie("USER_FLAG", attachments, expires);

            return ShowResult(member);

            //记录IMEI
            //imei = WebHelper.Decrypt(imei);
            //if (!string.IsNullOrEmpty(imei))
            //{
            //    _ingotService.InsertDevice(member.Id, imei, deviceType);
            //}
        }

        /// <summary>
        /// 检测安全性
        /// </summary>
        /// <returns></returns>
        private bool Security(int userid)
        {
            if (userid == 0)
                return false;
            var member = _memberService.GetById(userid);
            var value = (userid == ViewBag.User.ID && member.Password == ViewBag.User.Password);
            
            return value;
        }

        /// <summary>
        /// 返回结果（支持JSONP）
        /// </summary>
        /// <param name="data">结果对象</param>
        /// <param name="attachments">附加信息</param>
        private ActionResult ShowResult(object data, object attachments = null)
        {
            var model = new HttpResponseModel();
            model.Data = data;
            model.Attachments = attachments;
            if (string.IsNullOrEmpty(_NxpCallback))
                return Json(model);
            return Content(string.Format("{0}({1})", _NxpCallback, WebHelper.Json(model, "yyyy-MM-dd HH:mm:ss")));
        }

        /// <summary>
        /// 显示错误
        /// </summary>
        /// <param name="error">错误信息</param>
        /// <param name="code">错误代码</param>
        private ActionResult LogError(string error, int code = 1)
        {
            HttpResponseModel model = new Models.HttpResponseModel();
            model.Code = code;
            model.Message = error;
            if (string.IsNullOrEmpty(_NxpCallback))
                return Json(model);
            return Content(string.Format("{0}({1})", _NxpCallback, WebHelper.Json(model, "yyyy-MM-dd HH:mm:ss")));
        }
    }
}
