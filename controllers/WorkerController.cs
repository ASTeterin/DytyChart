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
                db.Workers.Add(new Worker { Name = "Иван Зосимов", IsDuty = false, IsDutyOnWedn = true, IsDutyOnLetters = false, IdGroup = 1});
                db.Workers.Add(new Worker { Name = "Виктор Борисов", IsDuty = false, IsDutyOnWedn = false, IsDutyOnLetters = true, IdGroup = 2});
                db.Workers.Add(new Worker { Name = "Елена Мохова", IsDuty = false, IsDutyOnWedn = false, IsDutyOnLetters = true, IdGroup = 3});
                db.Workers.Add(new Worker { Name = "Ирина Ведерникова", IsDuty = true, IsDutyOnWedn = false, IsDutyOnLetters = false, IdGroup = 3});
                db.SaveChanges();
                Worker worker = db.Workers.FirstOrDefault(w => w.Name == "Виктор Борисов");
                worker.SetUnwantedSlots(new List<int> { 1, 6, 8 });
                Worker worker1 = db.Workers.FirstOrDefault(w => w.Name == "Елена Мохова");
                worker1.SetUnwantedSlots(new List<int> { 4 });
                Worker worker2 = db.Workers.FirstOrDefault(w => w.Name == "Ирина Ведерникова");
                worker2.SetUnwantedSlots(new List<int> { 5, 6 });
                db.SaveChanges();
            }
            if (!db.Hours.Any())
            {
                db.Hours.Add(new Hour { Name = "09:00", MinCount = 2, MaxCount = 3, Date = new System.DateTime(2019, 11, 12) });
                db.SaveChanges();

            }
        }
        [HttpGet]
        public IEnumerable<Worker> Get()
        {
            return db.Workers.ToList();
        }

        public IEnumerable<Hour> GetHour()
        {
            return db.Hours.ToList();
        }

        [HttpGet("{id}")]
        public Worker Get(int id)
        {
            Worker worker = db.Workers.FirstOrDefault(x => x.Id == id);
            return worker;
        }

        public Hour GetHour(int id)
        {
            Hour hour = db.Hours.FirstOrDefault(x => x.Id == id);
            return hour;
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
        public IActionResult PostHour([FromBody]Hour hour)
        {
            if (ModelState.IsValid)
            {
                db.Hours.Add(hour);
                db.SaveChanges();
                return Ok(hour);
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
        public IActionResult PutHour(int id, [FromBody]Hour hour)
        {
            if (ModelState.IsValid)
            {
                db.Update(hour);
                db.SaveChanges();
                return Ok(hour);
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