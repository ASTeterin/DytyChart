using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using dutyChart.Models;
using dutyChart.Dto;
using System;
using Microsoft.EntityFrameworkCore;



namespace dutyChart.Controllers
{
    [Route("api/workers")]
    public class WorkerController : Controller
    {
        ApplicationContext db;
        public WorkerController(ApplicationContext context)
        {
            db = context;
            
        }
        [HttpGet]
        public IEnumerable<Worker> Get()
        {
            return db.Workers.ToList();
        }

        private int  getFreeSlots(int groupId, int countUsedSlots)
        {
            var countFreeSlots = 0;
            switch (groupId)
            {
                case 1:
                    countFreeSlots = 1 - countUsedSlots;
                    break;
                case 2:
                    countFreeSlots = 1 - countUsedSlots;
                    break;
                case 3:
                    countFreeSlots = 5 - countUsedSlots;
                    break;
            }
            return countFreeSlots;
        }

        private WorkerDto createWorkerDto(Worker worker, int countFreeSlots)
        {
            WorkerDto wDto = new WorkerDto();
            wDto.Id = worker.Id;
            wDto.IdGroup = worker.IdGroup;
            wDto.Name = worker.Name;
            wDto.CountFreeSlots = countFreeSlots;
            return wDto;
        }

        private List<int?> getWorkersIdInDay(List<IGrouping<int?, Slot>> freeSlotsForWorkers)
        {
            List<int?> workersId = new List<int?> { };
            foreach (var freeSlot in freeSlotsForWorkers)
            {
                workersId.Add(freeSlot.Key);
            }
            return workersId;
        }
            
        [HttpGet, Route("get-worker-free-slots")]
        public IEnumerable<WorkerDto> GetWorkerDtoInDay(DateTime date)
        {
            List <WorkerDto> workersDto= new List<WorkerDto> { };
            var workers = db.Workers.ToList();
            
            var hId = db.Hours.Where(h => h.Date == date)
                .Select(h => h.Id)
                .ToList();
            var countUsedSlots = db.Slots.Where(s => hId.Contains(s.HourId))
                .GroupBy(s => s.WorkerId)
                .ToList();
            //var result = coutUsedSlots.Join(workers, us => us.Key, w => w.Id, (us, w) => new {Count=us.Key,  WorkerId = w.Id, GroupId = w.IdGroup, Name = w.Name});
            var workersId = getWorkersIdInDay(countUsedSlots);
            
            foreach (var w in workers)
            {
                foreach (var us in countUsedSlots)
                {  
                    if (workersId.Contains(w.Id) && (us.Key != w.Id))
                    {
                        continue;
                    }
                    var countUsedSlotsForWorker = (workersId.Contains(w.Id)) ? us.Count() : 0;
                    int countFreeSlots = getFreeSlots(w.IdGroup, countUsedSlotsForWorker);
                    if (countFreeSlots > 0)
                    {
                        var wDto = createWorkerDto(w, countFreeSlots);
                        //wDto.countFreeSlots = (w.IsDuty) ? 0 : getFreeSlots(w.IdGroup, us.Count());
                        workersDto.Add(wDto);
                        break;
                    }                  
                }
            }
            return workersDto;
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