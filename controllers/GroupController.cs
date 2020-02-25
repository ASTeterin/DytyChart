using dutyChart.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace dutyChart.Controllers
{
    [Route( "api/Group" )]
    public class GroupController : Controller
    {
        ApplicationContext db;

        public GroupController( ApplicationContext context )
        {
            db = context;
        }
        [HttpGet]
        public IEnumerable<Group> Get()
        {
            return db.Groups.ToList();
        }

        [HttpGet("{id}")]
        public Group Get(int id)
        {
            return db.Groups.FirstOrDefault(x => x.Id == id);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Group group)
        {
            if (ModelState.IsValid)
            {
                db.Groups.Add(group);
                db.SaveChanges();
                return Ok(group);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Group group)
        {
            if (ModelState.IsValid)
            {
                db.Update(group);
                db.SaveChanges();
                return Ok(group);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Group group = db.Groups.FirstOrDefault(x => x.Id == id);
            if (group != null)
            {
                db.Groups.Remove(group);
                db.SaveChanges();
            }
            return Ok(group);
        }


    }
}
