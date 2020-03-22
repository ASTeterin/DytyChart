using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dutyChart.Models
{
    public class SpecialHour
    {
        public int Id { get; set; }
        public bool Type { get; set; }
        public int? WorkerId { get; set; }
        public int HourNumber { get; set; }
    }
}
