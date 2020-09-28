using System;
using System.Collections.Generic;
using System.Linq;
using dutyChart.Dto;
using dutyChart.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace dutyChart.Controllers
{
    [Route( "api/Slot" )]
    public class SlotController : Controller
    {
        ApplicationContext db;
        DataProcessor dp;

        private IActionResult delSlot( int hourId )
        {
            var slots = Get( hourId );
            foreach ( var slot in slots )
            {
                Delete( slot.Id );
            }
            return Ok();
        }
        public SlotController( ApplicationContext context, DataProcessor dataProcessor )
        {
            db = context;
            dp = dataProcessor;
        }

        [HttpGet, Route( "get-filled-slots" )]
        public List<SlotDto> GetFilledSlots( DateTime date )
        {
            return dp.DistributeSlots( date );
        }

        [HttpGet, Route("get-slots-in-day")]
        public List<SlotDto> GetSlotsInDay(DateTime date)
        {
            var hours = db.Hours.Where(h => h.Date == date).ToList();
            return dp.GetSlotsDto(hours);
        }

        [HttpGet( "{id}" )]
        public IEnumerable<Slot> Get( int hourId )
        {
            var slots = db.Slots
                .Where( s => s.HourId == hourId ).ToList();
            return slots;
        }

        [HttpPost]
        public IActionResult Post( [FromBody]Slot slot )
        {
            if ( ModelState.IsValid )
            {
                db.Slots.Add( slot );
                db.SaveChanges();
                return Ok( slot );
            }
            return BadRequest( ModelState );
        }

        [HttpPut( "{id}" )]
        public IActionResult Put( int id, [FromBody]Slot slot )
        {
            if ( ModelState.IsValid )
            {
                db.Update( slot );
                db.SaveChanges();
                return Ok( slot );
            }
            return BadRequest( ModelState );
        }


        [HttpDelete( "{id}" )]
        public IActionResult Delete( int id )
        {
            //Slot slot = db.Slots.FirstOrDefault(x => x.Id == id);
            var slots = Get( id );
            if ( slots != null )
            {
                foreach ( Slot slot in slots )
                {
                    db.Slots.Remove( slot );
                    db.SaveChanges();
                }
            }
            return Ok( slots );
        }


    }
}
