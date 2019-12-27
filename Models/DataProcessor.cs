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

    public class DataProcessor
    {
        readonly ApplicationContext _db;

        public DataProcessor(ApplicationContext db)
        {
            _db = db;
        }

        private void GetWorkersGroups(List<Worker> workers, out List<Worker> existingCustomerSupport, out List<Worker> newCustomerSupport, out List<Worker> vipCustomerSupport)
        {
            existingCustomerSupport = new List<Worker>() { };
            newCustomerSupport = new List<Worker>() { };
            vipCustomerSupport = new List<Worker>() { };
            foreach (Worker w in workers)
            {

                switch (w.IdGroup)
                {
                    case 1:
                        vipCustomerSupport.Add(w);
                        break;
                    case 2:
                        newCustomerSupport.Add(w);
                        break;
                    case 3:
                        existingCustomerSupport.Add(w);
                        break;
                }
            }
        }

        private List<int> GetArray(int countHours, List<int> numbersOfHours)
        {
            List<int> listOfZerosAndOnes = new List<int>();
            for (var i = 0; i < countHours; i++)
            {
                listOfZerosAndOnes.Add(0);
            }
            foreach (var index in numbersOfHours)
            {
                listOfZerosAndOnes[index] = 1;
            }
            return listOfZerosAndOnes;
        }

        public Boolean IsTwoHoursConsistently(List<int> listOfZerosAndOnes)
        {
            var count = 1;
            for (int i = 1; i < listOfZerosAndOnes.Count; i++)
            {
                if ((listOfZerosAndOnes[i] == 1) && (listOfZerosAndOnes[i - 1] == 1))
                {
                    count++;
                    if (count > 2)
                    {
                        return true;
                    }
                }
                else
                {
                    count = 1;
                }
            }
            return false;
        }
        private List<int> GetSlotNumbersForWorker(ref List<int> hoursInDay, int countSlotsForWorker)
        {
            List<int> listNumbers = new List<int>();
            int number, temp;
            int countHoursInDay = hoursInDay.Count;
            Random rand = new Random();
            //List<int> ar = new List<int>() { 1, 10, 3, 7, 1 };
            for (int i = 0; i < countSlotsForWorker;)
            {
                do
                {
                    number = rand.Next(0, countHoursInDay);
                }
                while ((listNumbers.Contains(number)) || (hoursInDay[number] == 0));

                listNumbers.Add(number);

                List<int> arrOfZeroesAndOnes = GetArray(countHoursInDay, listNumbers);

                if (IsTwoHoursConsistently(arrOfZeroesAndOnes))
                {
                    listNumbers.Remove(number);
                    continue;
                }

                temp = hoursInDay[number];
                hoursInDay.RemoveAt(number);
                hoursInDay.Add(temp);
                i++;

            }
            return listNumbers;
        }
        private List<SlotDto> GetSlotsDto(List<Hour> hours)
        {
            List<SlotDto> slotsDto = new List<SlotDto> { };
            foreach (var hour in hours)
            {
                var slotsInHour = _db.Slots.Where(s => s.HourId == hour.Id).ToList();
                foreach (var s in slotsInHour)
                {
                    slotsDto.Add(new SlotDto
                    {
                        HourId = s.HourId,
                        Id = s.Id,
                        Index = s.Index,
                        WorkerId = s.WorkerId
                    });
                }
                //slots.AddRange(hour.Slots.Select(s => new SlotDto { HourId = s.HourId, Id = s.Id, Index = s.Index, WorkerId = s.WorkerId }));
            }
            return slotsDto;
        }
        private void ResetSlots(List<Hour> hours)
        {
            foreach (var h in hours)
            {
                var slots = _db.Slots.Where(s => s.HourId == h.Id).ToList();
                foreach (var slot in slots)
                {
                    slot.WorkerId = 0;
                }
                _db.Slots.UpdateRange(slots);
                _db.SaveChanges();
            }
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

        private void FillSlots(Worker worker, List<int> slotNumbers, List<Hour> hours)
        {
            foreach (var slotNumber in slotNumbers)
            {
                var slotsInCurrentHour = _db.Slots.Where(s => s.HourId == hours[slotNumber].Id).ToList();
                foreach (var slotInCurrentHour in slotsInCurrentHour)
                {
                    if (slotInCurrentHour.WorkerId == 0)
                    {
                        slotInCurrentHour.WorkerId = worker.Id;
                        _db.Slots.Update(slotInCurrentHour);
                        _db.SaveChanges();
                        break;
                    }
                }

            }
        }

        public List<SlotDto> DistributeSlots(DateTime date)
        {
            //List<List<int>> slotsOfAllUsers = new List<List<int>>();
            var slots = new List<SlotDto>();
            var countSlotsForWorker = 0;
            var hours = _db.Hours
                .Where(h => h.Date == date)
                .ToList();

            List<int> countFreeSlots = new List<int> { };
            foreach (var h in hours)
            {
                countFreeSlots.Add(h.MinCount);
            }

            var workers = _db.Workers.ToList();
            var slotsInHour = _db.Slots.Where(s => s.HourId == hours[0].Id).ToList();
            if (slotsInHour.Count == 0)
            {
                CreateSlots(hours);
            }
            else
            {
                ResetSlots(hours);
            }

            List<Worker> existingCustomerSupport;
            List<Worker> newCustomerSupport;
            List<Worker> vipCustomerSupport;
            GetWorkersGroups(workers, out existingCustomerSupport, out newCustomerSupport, out vipCustomerSupport);

            foreach (var w in existingCustomerSupport)
            {
                countSlotsForWorker = 5;
                List<int> slotsNumber = GetSlotNumbersForWorker(ref countFreeSlots, countSlotsForWorker);
                FillSlots(w, slotsNumber, hours);
            }

            foreach (var w in newCustomerSupport)
            {
                countSlotsForWorker = 1;
                List<int> slotsNumber = GetSlotNumbersForWorker(ref countFreeSlots, countSlotsForWorker);
                FillSlots(w, slotsNumber, hours);
            }

            slots = GetSlotsDto(hours);

            return slots;
        }

       


    }
}
