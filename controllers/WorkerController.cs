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
                /*db.Workers.Add(new Worker { Name = "Иван Зосимов", IsDuty = false, IsDutyOnWedn = true, IsDutyOnLetters = false, DesiredTimes = new int[] { 1, 3 }, UnwantedTimes = new int[] { 6 } }) ;
                db.Workers.Add(new Worker { Name = "Виктор Борисов", IsDuty = false, IsDutyOnWedn = false, IsDutyOnLetters = true, DesiredTimes = new int[] { 1, 6, 8 }, UnwantedTimes = new int[] { 4 } });
                db.Workers.Add(new Worker { Name = "Елена Мохова", IsDuty = false, IsDutyOnWedn = false, IsDutyOnLetters = true, DesiredTimes = new int[] { 2, 3 }, UnwantedTimes = new int[] { 1, 4, 8 } });
                db.Workers.Add(new Worker { Name = "Ирина Ведерникова", IsDuty = true, IsDutyOnWedn = false, IsDutyOnLetters = false, DesiredTimes = new int[] { 5, 6 }, UnwantedTimes = new int[] { 2, 3, 4 } });
                */
                db.Workers.Add(new Worker { Name = "Иван Зосимов", IsDuty = false, IsDutyOnWedn = true, IsDutyOnLetters = false });
                db.Workers.Add(new Worker { Name = "Виктор Борисов", IsDuty = false, IsDutyOnWedn = false, IsDutyOnLetters = true});
                db.Workers.Add(new Worker { Name = "Елена Мохова", IsDuty = false, IsDutyOnWedn = false, IsDutyOnLetters = true});
                db.Workers.Add(new Worker { Name = "Ирина Ведерникова", IsDuty = true, IsDutyOnWedn = false, IsDutyOnLetters = false });
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