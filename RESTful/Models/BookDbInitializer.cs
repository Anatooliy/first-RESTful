using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RESTful.Models
{
    public class BookDbInitializer : DropCreateDatabaseAlways<BooksContext>
    {
        protected override void Seed(BooksContext context)
        { 
            Book book1 = new Book { BookName = "Красное и чёрное", AuthorName = "Стендаль", CreateDate = "1830" };
            Book book2 = new Book { BookName = "Выстрел", AuthorName = "Александр Сергеевич Пушкин", CreateDate = "1905" };
            context.Books.AddRange(new List<Book>() { book1, book2 });

            Genre genre1 = new Genre { GenreName = "Повесть", Books = new List<Book> { book2 } };
            Genre genre2 = new Genre { GenreName = "Притча" };
            Genre genre3 = new Genre { GenreName = "Роман", Books = new List<Book> { book1 } };
            Genre genre4 = new Genre { GenreName = "Баллада" };
            context.Genres.AddRange(new List<Genre>() { genre1, genre2, genre3, genre4 });

            Publisher publisher1 = new Publisher { PublisherName = "книголав", Books = new List<Book> { book1 } };
            Publisher publisher2 = new Publisher { PublisherName = "Pabulum", Books = new List<Book> { book2 } };
            Publisher publisher3 = new Publisher { PublisherName = "Книги ХХІ" };
            Publisher publisher4 = new Publisher { PublisherName = "Terra Incognita" };
            context.Publishers.AddRange(new List<Publisher>() { publisher1, publisher2, publisher3, publisher4 });
           
            base.Seed(context);
        }
    }
}