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
            ViewBag.Title = "Home Page";
            var genres = db.Genres.ToList(); 
            return View(genres);
        }
    }
}
