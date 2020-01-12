using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using dutyChart.Models;
using dutyChart.Dto;
using System;
using Microsoft.EntityFrameworkCore;

//namespace dutyChart.Models
namespace dutyChart.Controllers
{
    [Route("api/Hours")]
    public class HourController : Controller
    {
        ApplicationContext db;
        public HourController(ApplicationContext context)
        {
            db = context;
        }

        private List<HourDto> DefaultHourParams()
        {
            List<HourDto> hoursDto = new List<HourDto>() { };
            hoursDto.Add(new HourDto { Name = "08:00", MaxCount = 2, MinCount = 2 });
            hoursDto.Add(new HourDto { Name = "09:00", MaxCount = 4, MinCount = 4 });
            hoursDto.Add(new HourDto { Name = "10:00", MaxCount = 5, MinCount = 5 });
            hoursDto.Add(new HourDto { Name = "11:00", MaxCount = 6, MinCount = 6 });
            hoursDto.Add(new HourDto { Name = "12:00", MaxCount = 6, MinCount = 6 });
            hoursDto.Add(new HourDto { Name = "13:00", MaxCount = 6, MinCount = 6 });
            hoursDto.Add(new HourDto { Name = "14:00", MaxCount = 6, MinCount = 6 });
            hoursDto.Add(new HourDto { Name = "15:00", MaxCount = 6, MinCount = 6 });
            hoursDto.Add(new HourDto { Name = "16:00", MaxCount = 6, MinCount = 6 });
            hoursDto.Add(new HourDto { Name = "17:00", MaxCount = 6, MinCount = 6 });
            hoursDto.Add(new HourDto { Name = "18:00", MaxCount = 2, MinCount = 2 });
            hoursDto.Add(new HourDto { Name = "19:00", MaxCount = 1, MinCount = 1 });

            return hoursDto;
        }
        private List<Hour> GetHours(DateTime date)
        {
            List<Hour> hours = new List<Hour>() { };

            List<HourDto> hoursParams = new List<HourDto>() { };
            hours = db.Hours
                .Include(Hour.SlotsProperty)
                .Where(h => h.Date == date)
                .ToList();
            if (hours.Count == 0) {
                var hoursDto = DefaultHourParams();
                foreach (var h in hoursDto)
                {
                    var hour = new Hour { Name = h.Name, MaxCount = h.MaxCount, MinCount = h.MinCount, Date = date };
                    //db.Hours.Add(hour);
                    hours.Add(hour);
                }
                db.Hours.AddRange(hours);
                db.SaveChanges();
            }
            return hours;
        }
        [HttpGet]
        public IEnumerable<Hour> Get(DateTime date)
        {
            /*var hours = db.Hours
                .Include( Hour.SlotsProperty )
                .Where(h => h.Date == date).ToList();*/
            //var hours = db.
            var hours = GetHours(date);
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