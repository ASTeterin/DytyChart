using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using dutyChart.Models;

namespace dutyChart.Controllers
{
    [Route("api/Workers")]

    public class WorkerController : Controller
    {
        
        /*ApplicationContext db;
        public WorkerController(ApplicationContext context)
        {
            db = context;
            if (!db.Workers.Any())
            {
                db.Workers.Add(new Worker { Name = "iPhone X",  IsDuty = true });
                db.Workers.Add(new Worker { Name = "Galaxy S8", IsDuty = true });
                db.Workers.Add(new Worker { Name = "Pixel 2", IsDuty = true });
                db.SaveChanges();
            }
        }
        [HttpGet]
        public IEnumerable<Worker> Get()
        {
            return db.Workers.ToList();
        }

        [HttpGet("{id}")]
        public Worker Get(int id)
        {
            Worker Worker = db.Workers.FirstOrDefault(x => x.Id == id);
            return Worker;
        }

        [HttpPost]
        public IActionResult Post([FromBody]Worker Worker)
        {
            if (ModelState.IsValid)
            {
                db.Workers.Add(Worker);
                db.SaveChanges();
                return Ok(Worker);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Worker Worker)
        {
            if (ModelState.IsValid)
            {
                db.Update(Worker);
                db.SaveChanges();
                return Ok(Worker);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Worker Worker = db.Workers.FirstOrDefault(x => x.Id == id);
            if (Worker != null)
            {
                db.Workers.Remove(Worker);
                db.SaveChanges();
            }
            return Ok(Worker);
        }*/
    }
}
