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
                    //db.WorkerInDays.AddAsync(workerInDay);
                    workersInDay.Add(workerInDay);
                }
                db.WorkerInDays.AddRange(workersInDay);
                db.SaveChangesAsync();
                //workersInDay = db.WorkerInDays.Where(x => x.Date == date).ToList();
            }
            return workersInDay;
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

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]WorkerInDay workerInDay)
        {
            if (ModelState.IsValid)
            {
                db.Update(workerInDay);
                await db.SaveChangesAsync();
                return Ok(workerInDay);
            }
            return BadRequest(ModelState);
        }

        /*
        // GET: WorkerInDays
        public async Task<IActionResult> Index()
        {
            return View(await _context.WorkerInDays.ToListAsync());
        }

        // GET: WorkerInDays/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var workerInDay = await _context.WorkerInDays
                .FirstOrDefaultAsync(m => m.Id == id);
            if (workerInDay == null)
            {
                return NotFound();
            }

            return View(workerInDay);
        }

        // GET: WorkerInDays/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: WorkerInDays/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,WorkerId,IsDuty,IsDutyOnWedn,IsDutyOnLetters,Date")] WorkerInDay workerInDay)
        {
            if (ModelState.IsValid)
            {
                _context.Add(workerInDay);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(workerInDay);
        }

        // GET: WorkerInDays/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var workerInDay = await _context.WorkerInDays.FindAsync(id);
            if (workerInDay == null)
            {
                return NotFound();
            }
            return View(workerInDay);
        }

        // POST: WorkerInDays/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,WorkerId,IsDuty,IsDutyOnWedn,IsDutyOnLetters,Date")] WorkerInDay workerInDay)
        {
            if (id != workerInDay.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(workerInDay);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!WorkerInDayExists(workerInDay.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(workerInDay);
        }

        // GET: WorkerInDays/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var workerInDay = await _context.WorkerInDays
                .FirstOrDefaultAsync(m => m.Id == id);
            if (workerInDay == null)
            {
                return NotFound();
            }

            return View(workerInDay);
        }

        // POST: WorkerInDays/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var workerInDay = await _context.WorkerInDays.FindAsync(id);
            _context.WorkerInDays.Remove(workerInDay);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool WorkerInDayExists(int id)
        {
            return _context.WorkerInDays.Any(e => e.Id == id);
        }*/
    }
}
