using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Mvc.Web.Android.Models
{
    /// <summary>
    /// MemberTags
    /// </summary>
    ///子类并不映射到任何数据库，加上一个不映射的属性[NotMapped]
    [NotMapped]
    public partial class MemberTagsModel : BaseModel
    {
        [Display(Name = "登录名", Description = "4-20个字符")]
        [Required(ErrorMessage = "×")]
        [StringLength(20, MinimumLength = 4, ErrorMessage = "×")]
        public string Name { get; set; }

        [Display(Name = "密码", Description = "6-20个字符")]
        [Required(ErrorMessage = "×")]
        [StringLength(20, MinimumLength = 6, ErrorMessage = "×")]
        public string Password { get; set; }
    }
}