using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace RESTful.Models
{
    public class Book
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int BookId { get; set; }
        [Required]
        public string BookName { get; set; }
        public string AuthorName { get; set; }
        public string CreateDate { get; set; }
        public int? PublisherId { get; set; }
        public int? GenreId { get; set; }

        
        public  Publisher Publisher { get; set; }       
        public  Genre Genre { get; set; }
    }
}