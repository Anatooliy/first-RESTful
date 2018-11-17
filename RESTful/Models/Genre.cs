using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace RESTful.Models
{
    public class Genre
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int GenreId { get; set; }
        public string GenreName { get; set; }
        [System.Runtime.Serialization.IgnoreDataMember]
        public virtual ICollection<Book> Books { get; set; }

        public Genre()
        {
            Books = new List<Book>();
        }
    }
}