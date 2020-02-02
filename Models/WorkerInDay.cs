using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dutyChart.Models
{
    public class WorkerInDay
    {
        public int Id { get; set; }
        public int WorkerId { get; set; }
        public bool IsDuty { get; set; }
        public bool IsDutyOnWedn { get; set; }
        public bool IsDutyOnLetters { get; set; }
        public DateTime Date { get; set; }

    }
}
