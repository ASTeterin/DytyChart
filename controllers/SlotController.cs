using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dutyChart.Models;
using dutyChart.Dto;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace dutyChart.controllers
{
    [Route("api/Slot")]
    public class SlotController : Controller
    {
        ApplicationContext db;
        DataProcessor dp;

        private IActionResult delSlot(int hourId)
        {
            var slots = Get(hourId);
            foreach (var slot in slots) {
                Delete(slot.Id);
            }
            return Ok();
        }
        public SlotController(ApplicationContext context, DataProcessor dataProcessor)
        {
            db = context;
            dp = dataProcessor;
        }
        [HttpGet]

        [HttpGet, Route("get-filled-slots")]
        public List<SlotDto> GetFilledSlots(DateTime date)
        {
            return dp.DistributeSlots(date);
        }

        [HttpGet("{id}")]
        public IEnumerable<Slot> Get(int hourId)
        {
            var slots = db.Slots
                .Where(s => s.HourId == hourId).ToList();
            return slots;
        }

        [HttpPost]
        public IActionResult Post([FromBody]Slot slot)
        {
            if (ModelState.IsValid)
            {
                db.Slots.Add(slot);
                db.SaveChanges();
                return Ok(slot);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Slot slot)
        {
            if (ModelState.IsValid)
            {
                db.Update(slot);
                db.SaveChanges();
                return Ok(slot);
            }
            return BadRequest(ModelState);
        }
 

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var slots = Get(id);
          
            if (slots != null)
            {
                foreach (Slot slot in slots)
                {
                    db.Slots.Remove(slot);
                    db.SaveChanges();
                }
                
            }
            return Ok(slots);
        }


    }
}
