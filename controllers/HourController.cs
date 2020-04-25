using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using dutyChart.Models;
using dutyChart.Dto;
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace dutyChart.Controllers
{
    [Route("api/Hours")]
    public class HourController : Controller
    {
        ApplicationContext db;

        public IConfiguration Configuration { get; }
        public ArrayExample arrayOfHoursOptions { get; private set; }

        public HourController(ApplicationContext context, IConfiguration configuration)
        {
            db = context;
            Configuration = configuration;
        }

        private List<HourDto> DefaultHourParams()
        {
            List<HourDto> hoursDto = new List<HourDto>() { };
            var hourOptions = new HourParam();
            var hoursOptionsList = Configuration.GetSection("Hours:entries");
            arrayOfHoursOptions = Configuration.GetSection("Hours").Get<ArrayExample>();
      

     

            for (int j = 0; j < arrayOfHoursOptions.Entries.Length; j++)
            {
                
                hoursOptionsList.GetSection(j.ToString()).Bind(hourOptions);
                hoursDto.Add(new HourDto { Name = hourOptions.Name, 
                    MaxCount = Convert.ToInt32(hourOptions.MaxSlots), 
                    MinCount = Convert.ToInt32(hourOptions.MaxSlots)
                });

                //_array.Entries[j].Bind;
                //var t = hourOptions;
            }
            /*hoursDto.Add(new HourDto { Name = "08:00", MaxCount = 2, MinCount = 2 });
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
            */
            return hoursDto;
        }
        private List<Hour> GetHours(DateTime date)
        {
            List<Hour> hours = new List<Hour>() { };
            var dateUTC = date.ToUniversalTime();
            var dateOnly = date.Date;
            List<HourDto> hoursParams = new List<HourDto>() { };
            hours = db.Hours
                .Include(Hour.SlotsProperty)
                .Where(h => h.Date == dateOnly)
                .ToList();
            if (hours.Count == 0) {
                var hoursDto = DefaultHourParams();
                foreach (var h in hoursDto)
                {
                    var hour = new Hour { Name = h.Name, MaxCount = h.MaxCount, MinCount = h.MinCount, Date = dateOnly };
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

    public class ArrayExample
    {
        public HourParam[] Entries { get; set; }
    }
    public class HourParam
    {
        public string Name { get; set; }
        public string MinSlots { get; set; }
        public string MaxSlots { get; set; }
    }

    public class PositionOptions
    {
        public string Title { get; set; }
        public string Name { get; set; }
    }
}