using dutyChart.Models;
using dutyChart.Dto;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System;

namespace dutyChart.controllers
{
    [Route("api/DefaultSlots")]
    public class DefaultSlotsController: Controller
    {
        ApplicationContext db;

        public IConfiguration Configuration { get; }
        public ArrayExample arrayOfHoursOptions { get; private set; }

        public DefaultSlotsController(ApplicationContext context, IConfiguration configuration)
        {
            db = context;
            Configuration = configuration;
        }

        private List<HourDto> getDefaultHourSettings()
        {
            List<HourDto> hoursDto = new List<HourDto>() { };
            var hourOptions = new HourParam();
            var hoursOptionsList = Configuration.GetSection("Hours:entries");
            arrayOfHoursOptions = Configuration.GetSection("Hours").Get<ArrayExample>();
            for (int j = 0; j < arrayOfHoursOptions.Entries.Length; j++)
            {
                hoursOptionsList.GetSection(j.ToString()).Bind(hourOptions);
                hoursDto.Add(new HourDto
                {
                    Name = hourOptions.Name,
                    MaxCount = Convert.ToInt32(hourOptions.MaxSlots),
                    MinCount = Convert.ToInt32(hourOptions.MaxSlots)
                });
            }
            return hoursDto;
        }
    
        [HttpGet]
        public IEnumerable<DefaultSlots> Get()
        {
            var defaultHoursSettings = db.DefaultSlots.ToList();
            if (defaultHoursSettings.Count == 0) {
                var hoursDto = getDefaultHourSettings();
                foreach (var h in hoursDto)
                {
                    var hourSettings = new DefaultSlots { Name = h.Name, MaxCount = h.MaxCount, MinCount = h.MinCount };
                    defaultHoursSettings.Add(hourSettings);
                }
                db.DefaultSlots.AddRange(defaultHoursSettings);
                db.SaveChanges();
            }
            return defaultHoursSettings;
        }

        [HttpGet("{id}")]
        public DefaultSlots Get(int id)
        {
            return db.DefaultSlots.FirstOrDefault(x => x.Id == id);
        }

        [HttpPost]
        public IActionResult Post([FromBody]DefaultSlots defaultSlot)
        {
            if (ModelState.IsValid)
            {
                db.DefaultSlots.Add(defaultSlot);
                db.SaveChanges();
                return Ok(defaultSlot);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]DefaultSlots defaultSlot)
        {
            if (ModelState.IsValid)
            {
                db.Update(defaultSlot);
                db.SaveChanges();
                return Ok(defaultSlot);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            DefaultSlots defaultSlot = db.DefaultSlots.FirstOrDefault(x => x.Id == id);
            if (defaultSlot != null)
            {
                db.DefaultSlots.Remove(defaultSlot);
                db.SaveChanges();
            }
            return Ok(defaultSlot);
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
