using dutyChart.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dutyChart.Models
{
    public interface IDataProcessor {
        List<SlotDto> DistributeSlots(DateTime date);
    }
    public struct HoursWithCountFreeSlots
    {
        public Hour hour;
        public int countFreeSlots;
    }

    public class DataProcessor
    {
        readonly ApplicationContext _db;

        public DataProcessor(ApplicationContext db)
        {
            _db = db;
        }

        private List<int> FillSlotsForWorker(ref List<HoursWithCountFreeSlots> hoursInDay, int countSlotsForWorker)
        {
            List<int> listNumbers = new List<int>();
            int number;
            Random rand = new Random();
            for (int i = 0; i < countSlotsForWorker; i++)
            {
                do
                {
                    number = rand.Next(1, hoursInDay.Count);
                } while ((listNumbers.Contains(number)) || (hoursInDay[number].countFreeSlots == 0));
                listNumbers.Add(number);

                HoursWithCountFreeSlots currentHour = hoursInDay[number];
                currentHour.countFreeSlots--;
                hoursInDay[number] = currentHour;

            }
            return listNumbers;
        }
        private void CreateSlots(List<Hour> hours)
        {
            
            foreach (var h in hours)
            {
                var slotIndex = 0;
                List<Slot> slotsInHour = new List<Slot> { };
                for (var i = 0; i < h.MinCount; i++)
                {
                    var slot = new Slot();
                    slot.Index = slotIndex++;
                    slot.HourId = h.Id;
                    slotsInHour.Add(slot);
                }
                _db.Slots.AddRange(slotsInHour);
            }
            _db.SaveChanges();
        }

        public List<SlotDto> DistributeSlots(DateTime date)
        {
            //Slot[] slots = new Slot[1];
            var countSlotsForWorker = 0;
            var hours = _db.Hours
                .Where(h => h.Date == date)
                .ToList();
            var hoursWithFreeSlots = new List<HoursWithCountFreeSlots> { };
            foreach (var h in hours)
            {
                HoursWithCountFreeSlots hourWithFreeSlots = new HoursWithCountFreeSlots();
                hourWithFreeSlots.hour = h;
                hourWithFreeSlots.countFreeSlots = h.MinCount;
                hoursWithFreeSlots.Add(hourWithFreeSlots);
            }
            
            var workers = _db.Workers.ToList();

            var slots = new List<SlotDto>();
            var slotsInHour = _db.Slots.Where(s => s.HourId == hours[0].Id).ToList();
            if (slotsInHour.Count == 0) 
            {
                CreateSlots(hours);    
            } 
                

            foreach (var w in workers)
            {
                switch (w.IdGroup)
                {
                    case 1:
                        countSlotsForWorker = w.IsDuty? 6: 5;
                        break;
                    case 2:
                        countSlotsForWorker = 1;
                        break;
                }

                List<int> slotsNumber = FillSlotsForWorker(ref hoursWithFreeSlots, countSlotsForWorker);

            }
            
            foreach (var hour in hours)
            {
                var sl = _db.Slots.Where(s => s.HourId == hour.Id).ToList();
                if (sl.Count == 0) 
                { 
                        
                }
                foreach (var s in sl)
                {
                    slots.Add(new SlotDto
                    {
                        HourId = s.HourId,
                        Id = s.Id,
                        Index = s.Index,
                        WorkerId = s.WorkerId
                    });
                }
                
                
                
                //slots.AddRange(hour.Slots.Select(s => new SlotDto { HourId = s.HourId, Id = s.Id, Index = s.Index, WorkerId = s.WorkerId }));
            }

            
            
            foreach (var slot in slots)
            {
                slot.WorkerId = workers[0].Id;
            }
            return slots;  
        }


    }
}
