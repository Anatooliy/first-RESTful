namespace RESTful.Models
{
    using System;
    using System.Data.Entity;
    using System.Linq;

    public class BooksContext : DbContext
    {        
        public BooksContext()
            : base()
        {
        }        

        public virtual DbSet<Book> Books { get; set; }
        public virtual DbSet<Publisher> Publishers { get; set; }
        public virtual DbSet<Genre> Genres { get; set; }
    }
}