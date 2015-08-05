using System.Web;
using System.Web.Mvc;

namespace Mvc.Web.Android
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}