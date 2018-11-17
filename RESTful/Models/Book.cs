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
        public DateTime CreateDate { get; set; }
        public int? PublisherId { get; set; }
        public int? GenreId { get; set; }

        
        public virtual Publisher Publisher { get; set; }       
        public virtual Genre Genre { get; set; }
    }
}