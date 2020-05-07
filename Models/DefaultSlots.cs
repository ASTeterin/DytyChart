using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dutyChart.Models
{
    public class DefaultSlots
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MinCount { get; set; }
        public int MaxCount { get; set; }
    }
}
