using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RESTful.Models
{
    public class BookDbInitializer : CreateDatabaseIfNotExists<BooksContext>
    {
        protected override void Seed(BooksContext context)
        {
            Genre genre1 = new Genre { GenreName = "Повесть" };
            Genre genre2 = new Genre { GenreName = "Притча" };
            Genre genre3 = new Genre { GenreName = "Роман" };
            Genre genre4 = new Genre { GenreName = "Баллада" };
            context.Genres.AddRange(new List<Genre>() { genre1, genre2, genre3, genre4 });

            Publisher publisher1 = new Publisher { PublisherName = "#книголав" };
            Publisher publisher2 = new Publisher { PublisherName = "Pabulum" };
            Publisher publisher3 = new Publisher { PublisherName = "Книги ХХІ" };
            Publisher publisher4 = new Publisher { PublisherName = "Terra Incognita" };
            context.Publishers.AddRange(new List<Publisher>() { publisher1, publisher2, publisher3, publisher4 });

            base.Seed(context);
        }
    }
}