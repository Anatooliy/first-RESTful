using RESTful.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RESTful.Controllers
{
    public class HomeController : Controller
    {
        private BooksContext db = new BooksContext();
        public ActionResult Index()
        {           
            return View();
        }

        public ActionResult Index2()
        {
            return View(db.Books.ToList());
        }

        public ActionResult Genre()
        {
            return View(db.Genres.ToList());
        }
    }
}
