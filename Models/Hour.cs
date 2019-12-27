using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace dutyChart.Models
{
    public class Hour
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MinCount { get; set; }
        public int MaxCount { get; set; }
        public DateTime Date { get; set; }
        protected List<Slot> _slots { get; set; } = new List<Slot>();
        public IReadOnlyCollection<Slot> Slots
        {
            get { return _slots.ToList(); }
        }

        public static Expression<Func<Hour, IEnumerable<Slot>>> SlotsProperty => (s => s._slots);

    }
}
