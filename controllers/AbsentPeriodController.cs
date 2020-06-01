using System.Collections.Generic;
using System.Linq;
using dutyChart.Models;
using Microsoft.AspNetCore.Mvc;

namespace dutyChart.Controllers
{
    [Route( "api/AbsentPeriod" )]
    public class AbsentPeriodController : Controller
    {
        ApplicationContext db;


        public AbsentPeriodController( ApplicationContext context )
        {
            db = context;
        }
        [HttpGet]


        [HttpGet( "{id}" )]
        public IEnumerable<AbsentPeriod> Get( int workerId )
        {
            var absentPeriods = db.AbsentPeriods
                .Where( s => s.WorkerId == workerId ).ToList();
            return absentPeriods;
        }

        [HttpPost]
        public IActionResult Post( [FromBody]AbsentPeriod absentPeriod )
        {
            if ( ModelState.IsValid )
            {
                var foundAbsentPeriod = db.AbsentPeriods.FirstOrDefault(period => period.WorkerId == absentPeriod.WorkerId
                    && period.Start == absentPeriod.Start
                    && period.End == absentPeriod.End);
                if (foundAbsentPeriod == null)
                {
                    db.AbsentPeriods.Add(absentPeriod);
                    db.SaveChanges();
                    return Ok(absentPeriod);
                }
            }
            return BadRequest( ModelState );
        }

        [HttpPut( "{id}" )]
        public IActionResult Put( int id, [FromBody]AbsentPeriod absentPeriod )
        {
            if ( ModelState.IsValid )
            {
                db.Update( absentPeriod );
                db.SaveChanges();
                return Ok( absentPeriod );
            }
            return BadRequest( ModelState );
        }


        [HttpDelete( "{id}" )]
        public IActionResult Delete( int id )
        {
            var absentPeriod = db.AbsentPeriods.FirstOrDefault(x => x.Id == id);
            if (absentPeriod != null)
            {
                db.AbsentPeriods.Remove(absentPeriod);
                db.SaveChanges();
            }
            return Ok( absentPeriod );
        }
    }
}
