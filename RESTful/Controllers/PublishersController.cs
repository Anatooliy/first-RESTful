using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using RESTful.Models;

namespace RESTful.Controllers
{
    public class PublishersController : ApiController
    {
        private BooksContext db = new BooksContext();

        // GET: api/Publishers
        public IQueryable<Publisher> GetPublishers()
        {
            return db.Publishers;
        }

        // GET: api/Publishers/5
        [ResponseType(typeof(Publisher))]
        public async Task<IHttpActionResult> GetPublisher(int id)
        {
            Publisher publisher = await db.Publishers.FindAsync(id);
            if (publisher == null)
            {
                return NotFound();
            }

            return Ok(publisher);
        }

        // PUT: api/Publishers/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPublisher(int id, Publisher publisher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != publisher.PublisherId)
            {
                return BadRequest();
            }

            db.Entry(publisher).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PublisherExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Publishers
        [ResponseType(typeof(Publisher))]
        public async Task<IHttpActionResult> PostPublisher(Publisher publisher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Publishers.Add(publisher);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = publisher.PublisherId }, publisher);
        }

        // DELETE: api/Publishers/5
        [ResponseType(typeof(Publisher))]
        public async Task<IHttpActionResult> DeletePublisher(int id)
        {
            Publisher publisher = await db.Publishers.FindAsync(id);
            if (publisher == null)
            {
                return NotFound();
            }

            db.Publishers.Remove(publisher);
            await db.SaveChangesAsync();

            return Ok(publisher);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PublisherExists(int id)
        {
            return db.Publishers.Count(e => e.PublisherId == id) > 0;
        }
    }
}