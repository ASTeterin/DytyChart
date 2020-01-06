using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dutyChart.Dto
{
    public class WorkerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int IdGroup { get; set; }
        public int CountFreeSlots { get; set; }
    }
}
