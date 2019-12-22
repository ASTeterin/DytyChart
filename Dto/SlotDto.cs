using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dutyChart.Dto
{
    public class SlotDto
    {
        public int Id { get; set; }
        public int Index { get; set; }
        public int WorkerId { get; set; }
        public int HourId { get; set; }
    }
}
