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
    [Route("api/SpecialHour")]
    public class SpecialHourController : Controller
    {
        ApplicationContext db;
        public SpecialHourController(ApplicationContext context)
        {
            db = context;

        }


        [HttpGet]
        public SpecialHour GetSpecialHour(Boolean type, int workerId, int hourNumber)
        {
            var specialHour = db.SpecialHours.FirstOrDefault(x => x.Type == type && x.WorkerId == workerId && x.HourNumber == hourNumber);
                return specialHour;
        }


        [HttpGet, Route( "get-all-hours" )]

        public IEnumerable<SpecialHour> GetSpecialHours(int workerId)
        {
            var specialHour = db.SpecialHours.Where(x => x.WorkerId == workerId).ToList();
            return specialHour;
        }
        

        [HttpPost]
        public IActionResult Post([FromBody]SpecialHour specialHour)
        {
            if (ModelState.IsValid)
            {
                var specialHourFromDB = db.SpecialHours.FirstOrDefault(s => s.HourNumber == specialHour.HourNumber 
                && s.Type == specialHour.Type
                && s.WorkerId == specialHour.WorkerId);
                if (specialHourFromDB == null) 
                {
                    db.SpecialHours.Add(specialHour);
                    db.SaveChanges();
                    return Ok(specialHour);
                }
                return Ok(specialHour);

            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            SpecialHour specialHour = db.SpecialHours.FirstOrDefault(x => x.Id == id);
            if (specialHour != null)
            {
                db.SpecialHours.Remove(specialHour);
                db.SaveChanges();
            }
            return Ok(specialHour);
        }
    }
}

