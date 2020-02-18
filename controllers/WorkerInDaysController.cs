using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using dutyChart.Models;

namespace dutyChart.controllers
{
    [Route("api/WorkerInDay")]
    public class WorkerInDaysController : Controller
    {
        ApplicationContext db;
        public WorkerInDaysController(ApplicationContext context)
        {
            db = context;

        }
        [HttpGet]
        
        public IEnumerable<WorkerInDay> GetWorkersInDay(DateTime date)
        {
            var workersInDay = db.WorkerInDays.Where(x => x.Date == date).ToList();
            if (workersInDay.Count == 0) 
            {
                var workers = db.Workers.ToList();
                foreach (var w in workers) 
                {
                    WorkerInDay workerInDay = new WorkerInDay();
                    workerInDay.Date = date;
                    workerInDay.WorkerId = w.Id;
                    workersInDay.Add(workerInDay);
                }
                db.WorkerInDays.AddRange(workersInDay);
                db.SaveChangesAsync();
            }
            return workersInDay;
        }

        [HttpGet, Route("workers-by-group")]
        public IEnumerable<WorkerInDay> GetWorkersInDayByGroup(DateTime date, int groupId)
        {

            var result = new List<WorkerInDay>();
            var workersInDay = db.WorkerInDays.Where(x => x.Date == date).ToList();
            var workersByGroup = db.Workers.Where(w => w.IdGroup == groupId).ToList();
            foreach (var worker in workersByGroup)
            {
                var workerInDay = workersInDay.FirstOrDefault(w => w.WorkerId == worker.Id);
                result.Add(workerInDay);
            }
            return result;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]WorkerInDay workerInDay)
        {
            if (ModelState.IsValid)
            {
                db.WorkerInDays.Add(workerInDay);
                await db.SaveChangesAsync();
                return Ok(workerInDay);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put([FromBody]WorkerInDay[] workersInDay)
        {
            if (ModelState.IsValid)
            {
                db.UpdateRange(workersInDay);
                
                db.SaveChanges();
                return Ok(workersInDay);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public  IActionResult Put(int id, [FromBody]WorkerInDay workerInDay)
        {
            int dutyWorkerGroup = 4;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            int workerGroup = db.Workers.FirstOrDefault(w => w.Id == workerInDay.WorkerId).IdGroup;
            if (workerGroup == dutyWorkerGroup)
            {
                var dutyWorkers = db.Workers.Where(w => w.IdGroup == dutyWorkerGroup);
                foreach (Worker w in dutyWorkers)
                {
                    WorkerInDay eachWorkerInDay = db.WorkerInDays.Where(x => x.WorkerId == w.Id && x.Date == workerInDay.Date).FirstOrDefault();
                    eachWorkerInDay.IsDuty = false;
                }

            }
            
            WorkerInDay currentWorkerInDay = db.WorkerInDays.Where(x => x.WorkerId == workerInDay.WorkerId && x.Date == workerInDay.Date).FirstOrDefault();
            currentWorkerInDay.IsDuty = workerInDay.IsDuty;
            currentWorkerInDay.IsDutyOnLetters = workerInDay.IsDutyOnLetters;
            currentWorkerInDay.IsDutyOnWedn = workerInDay.IsDutyOnWedn;
            db.SaveChanges();
            return Ok(ModelState);
        }
    }
}
