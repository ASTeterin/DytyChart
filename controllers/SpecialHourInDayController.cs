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
    [Route("api/SpecialHoursInDay")]
    public class SpecialHourInDayController : Controller
    {
        ApplicationContext db;
        public SpecialHourInDayController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet]
        public IEnumerable<SpecialHourInDay> GetSpecialHourInDay(DateTime date, int workerId)
        {
            var specialHourInDay = db.SpecialHoursInDay.Where(x => x.Date == date && x.WorkerId == workerId).ToList();
            return specialHourInDay;

        }

        [HttpGet, Route("all-special-hours")]
        public IEnumerable<SpecialHourInDay> GetSpecialHoursInDayFromSpecialHours(IEnumerable<SpecialHourInDay> specialHours, DateTime date)
        {
            var allSpecialHoursInDay = db.SpecialHoursInDay.Where(s => s.Date == date).ToList();
            db.SpecialHoursInDay.RemoveRange(allSpecialHoursInDay);
            allSpecialHoursInDay = new List<SpecialHourInDay> { };
            //if (allSpecialHoursInDay.Count == 0)
            //{
                var allSpecialHours = db.SpecialHours.ToList();
                foreach (var specialHour in allSpecialHours)
                {
                    var specialHourInDay = new SpecialHourInDay();
                    specialHourInDay.Date = date;
                    specialHourInDay.HourNumber = specialHour.HourNumber;
                    specialHourInDay.Type = specialHour.Type;
                    specialHourInDay.WorkerId = specialHour.WorkerId;
                    allSpecialHoursInDay.Add(specialHourInDay);
                }
                db.SpecialHoursInDay.AddRange(allSpecialHoursInDay);
                db.SaveChanges();
            //}
            return allSpecialHoursInDay;
        }

        [HttpGet, Route("desirable-hours")]
        public IEnumerable<SpecialHourInDay> GetDesirableHourInDay(DateTime date, int workerId)
        {
            var type = true;
            var specialHourInDay = db.SpecialHoursInDay.Where(x => x.Date == date && x.Type == true && x.WorkerId == workerId).ToList();
            return specialHourInDay;
        }

        [HttpGet, Route("unwanted-hours")]
        public IEnumerable<SpecialHourInDay> GetUnwantedHourInDay(DateTime date, int workerId)
        {
            var specialHourInDay = db.SpecialHoursInDay.Where(x => x.Date == date && x.Type == false && x.WorkerId == workerId).ToList();
            return specialHourInDay;
        }


        [HttpPost]
        public IActionResult Post([FromBody]SpecialHourInDay specialHourInDay)
        {
            if (ModelState.IsValid)
            {
                db.SpecialHoursInDay.Add(specialHourInDay);
                db.SaveChanges();
                return Ok(specialHourInDay);
            }
            return BadRequest(ModelState);
        }
    }
}
