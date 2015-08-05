using Mvc.Web.Android.Helper;
using Mvc.Web.Android.Models.Book;
using NapiService;
using NapiService.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mvc.Web.Android.Controllers
{
    public class BookController : BaseController
    {
        #region MyRegion
        /// <summary>
        /// BookService
        /// </summary>
        BookService _bookservice = new BookService();

        /// <summary>
        /// 首本书说明
        /// </summary>
        string _fristinfo = "";
        #endregion

        #region 主页面
        /// <summary>
        /// 精品页(主页)
        /// </summary>
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 免费页
        /// </summary>
        public ActionResult MianFei()
        {
            return View();
        }

        /// <summary>
        /// 榜单页
        /// </summary>
        public ActionResult Bank()
        {
            return View();
        }

        /// <summary>
        /// 出版页
        /// </summary>
        public ActionResult Publish()
        {
            return View();
        }

        /// <summary>
        /// 猜你喜欢页
        /// </summary>
        public ActionResult GuessLike()
        {
            return View();
        }

        /// <summary>
        /// 更多精品页
        /// </summary>
        public ActionResult MoreJingPin(int type = (int)RecommendClass.Fine, int sort = (int)SearchSort.VipSameDayDescAndUpdateTimeDesc)
        {
            int[] types = { type, sort };
            return View(types);
        }

        /// <summary>
        /// 分类页
        /// </summary>
        /// <returns></returns>
        public ActionResult Category(int Type = (int)CategoryClass.None,int Sort=(int)CategorySort.New )
        {
            var model = new CategoryModel();
            model.Type = (CategoryClass)Type;
            model.Sort = (CategorySort)Sort;
            return View(model);
        }

        /// <summary>
        /// 专题页
        /// </summary>
        /// <returns></returns>
        public ActionResult ZhuanTi()
        {
            return View();
        }
        #endregion

        #region 部分视图页面
        /// <summary>
        /// 效果视图1
        /// </summary>
        public ActionResult GetEffectRecommend(int count, int maxcount, int recommendType)
        {
            try
            {
                var booksearchlist = _bookservice.GetEffectRecommendtion((RecommendClass)recommendType, count, maxcount, out _fristinfo);
                if (booksearchlist.Count == 0)
                    return new EmptyResult();
                return PartialView("_PartEffectList", new Tuple<List<Booksearch>, string, int>(booksearchlist, _fristinfo.ShortIntro(40), 0));
            }
            catch (Exception e)
            {
                return new EmptyResult();
            }
        }

        /// <summary>
        /// 效果视图(没有图片)
        /// </summary>
        public ActionResult GetEffectRecommendNoImg(int count, int effecttype)
        {
            try
            {
                var bookeffectlist = _bookservice.GetEffects(effecttype, count, out _fristinfo);
                if (bookeffectlist.Count == 0)
                    return new EmptyResult();
                return PartialView("_PartEffectNoImgList", bookeffectlist);
            }
            catch (Exception e)
            {
                return new EmptyResult();
            }
        }

        /// <summary>
        /// 效果视图2
        /// </summary>
        public ActionResult GetEffect(int count, int effecttype)
        {
            try
            {
                var bookeffectlist = _bookservice.GetEffects(effecttype, count, out _fristinfo);
                if (bookeffectlist.Count == 0)
                    return new EmptyResult();
                return PartialView("_PartEffectList", new Tuple<List<Bookeffect>, string, int>(bookeffectlist, _fristinfo.ShortIntro(40), 1));
            }
            catch (Exception e)
            {
                return new EmptyResult();
            }
        }

        /// <summary>
        /// 效果视图(只有图片)
        /// </summary>
        public ActionResult GetEffectImg(int count, int effecttype)
        {
            try
            {
                var bookeffectlist = _bookservice.GetEffects(effecttype, count, out _fristinfo);
                if (bookeffectlist.Count == 0)
                    return new EmptyResult();
                bookeffectlist = bookeffectlist.OrderBy(x => System.Guid.NewGuid()).ToList();
                return PartialView("_PartEffectImgList", bookeffectlist);
            }
            catch (Exception e)
            {
                return new EmptyResult();
            }
        }

        /// <summary>
        /// 榜单视图
        /// </summary>
        public ActionResult GetRankings(int rankingtype, int index, int size)
        {
            try
            {
                var total = 0;
                var booksearchlist = _bookservice.GetRankings((NapiService.RankingClass)rankingtype, index, size, out total);
                if (booksearchlist.Count == 0)
                    return new EmptyResult();
                ViewBag.rankingtype = rankingtype;
                ViewBag.rankindex = index;
                ViewBag.ranktotal = total;
                return PartialView("_PartRankingsList", booksearchlist);
            }
            catch (Exception e)
            {
                return new EmptyResult();
            }
        }

        /// <summary>
        /// 分类视图
        /// </summary>
        public ActionResult GetCategoryView(int classid = (int)CategoryClass.None, int sort = (int)CategorySort.New, int index = 0, int size = 10)
        {
            try
            {
                ViewBag.IsShow = false;
                var obj = new SearchObject();
                switch (classid)
                {
                    case (int)CategoryClass.None: ViewBag.IsShow = true; break;
                    case (int)CategoryClass.Monthly: ViewBag.IsShow = true; classid = (int)CategoryClass.None; obj.IsMonthly = true; break;
                }
                switch (sort)
                {
                    case (int)CategorySort.Free: sort = (int)CategorySort.Hot; obj.IsClientFree = true; break;
                    case (int)CategorySort.SpecialOffer: sort = (int)CategorySort.Hot; obj.IsSpecialoffer = true; break;
                    case (int)CategorySort.Finished: sort = (int)CategorySort.Hot; obj.Status = SearchBookStatus.Finished; break;
                }

                obj.Class = (SearchClass)classid;
                obj.Sort = (SearchSort)sort;
                obj.Index = index;
                obj.Size = size;

                var total = 0;
                var booksearchlist = _bookservice.Search(obj, out total);
                if (total == 0 || booksearchlist.Count == 0)
                    return new EmptyResult();
                ViewBag.total = total;
                ViewBag.size = size;
                return PartialView("_PartCategoryList", booksearchlist);
            }
            catch (Exception e)
            {
                return new EmptyResult();
            }
        }

        /// <summary>
        /// 猜你喜欢部分视图
        /// </summary>
        /// <param name="count"></param>
        /// <param name="effecttype"></param>
        /// <returns></returns>
        public ActionResult GetGuessLikeView(int count, int effecttype)
        {
            try
            {
                var bookeffectlist = _bookservice.GetEffects(effecttype, count, out _fristinfo);
                if (bookeffectlist.Count == 0)
                    return new EmptyResult();
                return PartialView("_PartGuessLikeList", bookeffectlist);
            }
            catch (Exception e)
            {
                return new EmptyResult();
            }
        }

        /// <summary>
        /// 更多精品部分视图
        /// </summary>
        /// <param name="type"></param>
        /// <param name="sort"></param>
        /// <param name="index"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public ActionResult GetMoreJingPinView(int type = (int)RecommendClass.Fine, int sort = (int)SearchSort.VipSameDay_Desc, int index = 0, int size = 10)
        {
            try
            {
                var obj = new SearchObject();
                switch ((RecommendClass)type)
                {
                    case RecommendClass.Finished: obj.Status = SearchBookStatus.Finished; break;
                    case RecommendClass.Ancient: obj.Class = SearchClass.Aerial | SearchClass.History | SearchClass.PassThrough; break;
                    case RecommendClass.Modern: obj.Class = SearchClass.Urban | SearchClass.Youth | SearchClass.PowerfulFamily; break;
                    case RecommendClass.Occult: obj.Class = SearchClass.Ability | SearchClass.Magical | SearchClass.Occult; break;
                    case RecommendClass.Free: obj.IsClientFree = true; break;
                }

                obj.Sort = (SearchSort)sort;
                obj.Index = index;
                obj.Size = size;

                var total = 0;
                var booksearchlist = _bookservice.Search(obj, out total);
                if (total == 0 || booksearchlist.Count == 0)
                    return new EmptyResult();
                ViewBag.total = total;
                ViewBag.size = size;
                return PartialView("_PartMoreJingPinList", booksearchlist);
            }
            catch (Exception e)
            {
                return new EmptyResult();
            }
        }

        /// <summary>
        /// 出版部分视图
        /// </summary>
        /// <param name="type"></param>
        /// <param name="sort"></param>
        /// <param name="index"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public ActionResult GetPublishView(int type = (int)RecommendClass.Fine, int sort = (int)SearchSort.VipSameDay_Desc, int index = 0, int size = 10)
        {
            try
            {
                var obj = new SearchObject();
                switch ((RecommendClass)type)
                {
                    case RecommendClass.Finished: obj.Status = SearchBookStatus.Finished; break;
                    case RecommendClass.Ancient: obj.Class = SearchClass.Aerial | SearchClass.History | SearchClass.PassThrough; break;
                    case RecommendClass.Modern: obj.Class = SearchClass.Urban | SearchClass.Youth | SearchClass.PowerfulFamily; break;
                    case RecommendClass.Occult: obj.Class = SearchClass.Ability | SearchClass.Magical | SearchClass.Occult; break;
                    case RecommendClass.Free: obj.IsClientFree = true; break;
                }

                obj.Sort = (SearchSort)sort;
                obj.Index = index;
                obj.Size = size;

                var total = 0;
                var booksearchlist = _bookservice.Search(obj, out total);
                if (total == 0 || booksearchlist.Count == 0)
                    return new EmptyResult();
                ViewBag.total = total;
                ViewBag.size = size;
                return PartialView("_PartMoreJingPinList", booksearchlist);
            }
            catch (Exception e)
            {
                return new EmptyResult();
            }
        }
        #endregion
    }
}
