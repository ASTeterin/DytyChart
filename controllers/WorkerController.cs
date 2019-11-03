using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using dutyChart.Models;



namespace dutyChart.Controllers
{
    [Route("api/workers")]
    public class WorkerController : Controller
    {
        ApplicationContext db;
        public WorkerController(ApplicationContext context)
        {
            db = context;
            if (!db.Workers.Any())
            {
                db.Workers.Add(new Worker { Name = "Иван Зосимов", IsDuty = false, IsDutyOnWedn = false, IsDutyOnLetters = false}) ;
                db.Workers.Add(new Worker { Name = "Виктор Борисов", IsDuty = false, IsDutyOnWedn = false, IsDutyOnLetters = false });
                db.Workers.Add(new Worker { Name = "Елена Мохова", IsDuty = false, IsDutyOnWedn = false, IsDutyOnLetters = false});
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
            Worker worker = db.Workers.FirstOrDefault(x => x.Id == id);
            return worker;
        }

        [HttpPost]
        public IActionResult Post([FromBody]Worker worker)
        {
            if (ModelState.IsValid)
            {
                db.Workers.Add(worker);
                db.SaveChanges();
                return Ok(worker);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Worker worker)
        {
            if (ModelState.IsValid)
            {
                db.Update(worker);
                db.SaveChanges();
                return Ok(worker);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Worker worker = db.Workers.FirstOrDefault(x => x.Id == id);
            if (worker != null)
            {
                db.Workers.Remove(worker);
                db.SaveChanges();
            }
            return Ok(worker);
        }
    }
}