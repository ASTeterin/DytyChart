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
                db.AbsentPeriods.Add( absentPeriod );
                db.SaveChanges();
                return Ok( absentPeriod );
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
            //Slot slot = db.Slots.FirstOrDefault(x => x.Id == id);
            /*var absentPeriods = Get( id );

            if ( absentPeriods != null )
            {
                foreach ( AbsentPeriod absentPeriod in absentPeriods )
                {
                    db.AbsentPeriods.Remove( absentPeriod );
                    db.SaveChanges();
                }

            }*/
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
