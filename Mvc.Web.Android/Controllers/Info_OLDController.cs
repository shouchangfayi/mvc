using Mvc.Web.Android.Helper;
using NapiService;
using NapiService.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mvc.Web.Android.Controllers
{
    public class Info_OLDController : BaseController
    {
        /// <summary>
        /// 详情数据
        /// </summary>
        public InfoDetail Detail = new InfoDetail();

        NapiService.BookService _bookService = new NapiService.BookService();
        NapiService.BookcaseService _bookcaseService = new NapiService.BookcaseService();
        NapiService.ChapterService _bookChapterService = new NapiService.ChapterService();

        /// <summary>
        /// 页面主入口
        /// </summary>
        public ActionResult Index(int bookid = 0)
        {
            ViewBag.BID = bookid;

            if (bookid == 0)
                return RedirectToAction("NotFound", "Error", new { err = "该作品不存在或者已暂时被下架" });

            if (bookid != 0)
            {
                ViewBag.IsKeep = _bookcaseService.Exists(ViewBag.User.ID, bookid);
            }

            Detail = GetInfoDetail(bookid);

            if (Detail.Book.Id != bookid || Detail.Book.Check != 0)
                return RedirectToAction("NotFound", "Error", new { err = "该作品不存在或者已暂时被下架" });

            if (Detail.Book.SpecialOffer > 0)
            {

                ViewBag.Tejia_Class = "group g2";
                ViewBag.Tejia_InnerHtml = string.Format(
                        "<li><a href=\"javascript:XiaoXiangJS.download({1},'{3}')\" class=\"button color1 r3\">下载到本地离线阅读</a></li><li><a href=\"javascript:;\" onclick=\"Site.showQuanbenrSubscribebox({0},{1})\" class=\"button color3 r3\">{2}元特价</a></li>"
                        , ViewBag.UserID, Detail.Book.Id, Detail.Book.SpecialOffer / 100, Detail.Book.Title);

                //判断是否包月
                if (ViewBag.User.ID > 0)
                {
                    DateTime baoyueTime = _memberService.GetMonthlyEndTime(ViewBag.User.ID);
                    if (baoyueTime > DateTime.Now)
                    {
                        if (Detail.Book.IsMonthly == 1)
                        {
                            ViewBag.Tejia_Class = "group g1";
                            ViewBag.Tejia_InnerHtml = string.Format(
                                "<li><a href=\"javascript:XiaoXiangJS.download({0},'{1}')\" class=\"button color1 r3\">下载到本地离线阅读</a></li>"
                                , Detail.Book.Id, Detail.Book.Title);
                        }
                    }
                }

            }
            else
            {
                ViewBag.Tejia_Class = "group g1";
                ViewBag.Tejia_InnerHtml = string.Format(
                        "<li><a href=\"javascript:XiaoXiangJS.download({0},'{1}')\" class=\"button color1 r3\">下载到本地离线阅读</a></li>"
                        , Detail.Book.Id, Detail.Book.Title);
            }

            return View(Detail);
        }

        /// <summary>
        /// 获取详情数据
        /// </summary>
        InfoDetail GetInfoDetail(int bookid)
        {
            var detail = new InfoDetail();

            var book = _bookService.Get(bookid);

            var lastChapterTags = _bookChapterService.GetLast(bookid);

            if (book != null)
            {
                detail.Book = book;
                //获取最新的5条评论
                //detail.Revies.AddRange(_bookReviewService.GetReviews(bookid, 0, 5, 0, out iTotal));
                //获取同类推荐
                //detail.SimilarBooks.AddRange(_cacheManager.Get<List<Nxp.Framework.Model.Books.Booksearch>>(string.Format("TongleiTuijian_{0}", book.ClassId), 180, () => { return _bookSearchService.SameRecommendtion(bookid, 5, 50); }));
                //获取作者其他
                //detail.AuthorOtherBooks.AddRange(_bookSearchService.GetAuthorOtherBooks(bookid));
                //获取最新章节
                detail.LastChapterTags = lastChapterTags;
            }
            return detail;
        }

        public class InfoDetail
        {
            public Book Book = new Book();
            public Bookgift Props = new Bookgift();
            public List<Bookreview> Revies = new List<Bookreview>();
            public List<Booksearch> AuthorOtherBooks = new List<Booksearch>();
            public List<Booksearch> SimilarBooks = new List<Booksearch>();
            public Chapter LastChapterTags = new Chapter();
        }
    }
}
