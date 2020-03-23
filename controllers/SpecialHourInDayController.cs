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
    [Route("api/SpecialHourInDay")]
    public class SpecialHourInDayController : Controller
    {
        ApplicationContext db;
        public SpecialHourInDayController(ApplicationContext context)
        {
            db = context;

        }
        [HttpGet]
        public IEnumerable<SpecialHourInDay> Get()
        {
            return db.SpecialHoursInDay.ToList();
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
