using dutyChart.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace dutyChart.controllers
{
    [Route("api/DefaultSlots")]
    public class DefaultSlotsController: Controller
    {
        ApplicationContext db;

        public DefaultSlotsController(ApplicationContext context)
        {
            db = context;
        }
        [HttpGet]
        public IEnumerable<DefaultSlots> Get()
        {
            return db.DefaultSlots.ToList();
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
}
