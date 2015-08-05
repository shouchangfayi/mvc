using NapiService;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Mvc.Web.Android.Models.Book
{
    /// <summary>
    /// 分类页Model
    /// </summary>
    public class CategoryModel
    {
        /// <summary>
        /// 排序
        /// </summary>
        public CategorySort Sort = CategorySort.New;
        /// <summary>
        /// 分类
        /// </summary>
        public CategoryClass Type = CategoryClass.None;
    }

    /// <summary>
    /// 排序
    /// </summary>
    public enum CategorySort
    {
        /// <summary>
        /// 热门
        /// </summary>
        Hot = (int)SearchSort.VipSameDay_Desc,
        /// <summary>
        /// 免费
        /// </summary>
        Free=96,
        /// <summary>
        /// 完结
        /// </summary>
        Finished=99,
        /// <summary>
        /// 最新
        /// </summary>
        New = (int)SearchSort.VipSameDayDescAndUpdateTimeDesc,
        /// <summary>
        /// 特价
        /// </summary>
        SpecialOffer = 97,
    }

    /// <summary>
    /// 分类
    /// </summary>
    public enum CategoryClass
    {
        /// <summary>
        /// 所有分类
        /// </summary>
        None = (int)SearchClass.None,
        /// <summary>
        /// 穿越
        /// </summary>
        PassThrough = (int)SearchClass.PassThrough,
        /// <summary>
        /// 架空
        /// </summary>
        Aerial = (int)SearchClass.Aerial,
        /// <summary>
        /// 都市
        /// </summary>
        Urban = (int)SearchClass.Urban,
        /// <summary>
        /// 青春
        /// </summary>
        Youth = (int)SearchClass.Youth,
        /// <summary>
        /// 魔幻
        /// </summary>
        Magical = (int)SearchClass.Magical,
        /// <summary>
        /// 玄幻
        /// </summary>
        Occult = (int)SearchClass.Occult,
        /// <summary>
        /// 豪门
        /// </summary>
        PowerfulFamily = (int)SearchClass.PowerfulFamily,
        /// <summary>
        /// 历史
        /// </summary>
        History = (int)SearchClass.History,
        /// <summary>
        /// 异能
        /// </summary>
        Ability = (int)SearchClass.Ability,
        /// <summary>
        /// 短篇
        /// </summary>
        ShortArticle = (int)SearchClass.ShortArticle,
        /// <summary>
        /// 耽美
        /// </summary>
        Tanbi = (int)SearchClass.Tanbi,
        /// <summary>
        /// 包月
        /// </summary>
        Monthly = 98,
    }
}