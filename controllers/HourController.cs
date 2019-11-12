using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using dutyChart.Models;



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
        public IEnumerable<Hour> Get()
        {
            return db.Hours.ToList();
        }

        [HttpGet("{id}")]
        public Hour Get(int id)
        {
            Hour Hour = db.Hours.FirstOrDefault(x => x.Id == id);
            return Hour;
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