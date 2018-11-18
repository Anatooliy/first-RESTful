using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RESTful.Models
{
    public class Publisher
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int PublisherId { get; set; }
        public string PublisherName { get; set; }        
        public virtual ICollection<Book> Books { get; set; }

        public Publisher()
        {
            Books = new List<Book>();
        }
    }
}