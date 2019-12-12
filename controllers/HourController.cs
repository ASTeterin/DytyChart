using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using dutyChart.Models;
using System;
using Microsoft.EntityFrameworkCore;

namespace dutyChart.Controllers
{
    [Route("api/Hours")]
    public class HourController : Controller
    {
        ApplicationContext db;
        public HourController(ApplicationContext context)
        {
            db = context;
            if (!db.Hours.Any())
            {
                db.Hours.Add(new Hour { Name = "09:00", MinCount = 2, MaxCount = 3, Date = new System.DateTime(2019, 11, 12)});
                db.SaveChanges();
               
            }
        }
        [HttpGet]
        public IEnumerable<Hour> Get(DateTime date)
        {
            var hours = db.Hours
                .Include( Hour.SlotsProperty )
                .Where(h => h.Date == date).ToList();
            return hours;
        }

        [HttpGet("{id}")]
        public Hour Get(int id)
        {
            Hour hour = db.Hours.FirstOrDefault(x => x.Id == id);
            return hour;
        }

        [HttpPost]
        public IActionResult Post([FromBody]Hour Hour)
        {
            if (ModelState.IsValid)
            {
                db.Hours.Add(Hour);
                db.SaveChanges();
                return Ok(Hour);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Hour Hour)
        {
            if (ModelState.IsValid)
            {
                db.Update(Hour);
                db.SaveChanges();
                return Ok(Hour);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Hour Hour = db.Hours.FirstOrDefault(x => x.Id == id);
            if (Hour != null)
            {
                db.Hours.Remove(Hour);
                db.SaveChanges();
            }
            return Ok(Hour);
        }
    }
}