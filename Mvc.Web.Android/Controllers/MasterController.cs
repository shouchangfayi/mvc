using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mvc.Web.Android.Controllers
{
    /// <summary>
    /// 母版页
    /// </summary>
    public class MasterController : BaseController
    {
        /// <summary>
        /// 设置（版本，设备ID）
        /// </summary>
        public ActionResult SettingsCommon()
        {
            return PartialView();
        }

        /// <summary>
        /// 宣传
        /// </summary>
        public ActionResult XuanChuan()
        {
            if (ViewBag.User.ID == 0)
                return new EmptyResult();
            if (IsNewMember())
                return PartialView();

            return new EmptyResult();
        }
    }
}
