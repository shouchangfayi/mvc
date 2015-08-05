using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Mvc.Web.Android.Models
{
    /// <summary>
    /// 基础对象
    /// </summary>
    public partial class BaseModel
    {
        [Display(Name = "ID")]
        public int ID { get; set; }
    }
}