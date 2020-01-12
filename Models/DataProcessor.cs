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

        private bool СanDuty(Worker worker, DateTime date)
        {
            List<AbsentPeriod> absentPeriods = _db.AbsentPeriods.Where(p => p.WorkerId == worker.Id).ToList();
            bool canDuty = true;
            foreach (var period in absentPeriods)
            { 
                if ((date >= period.Start) && (date <= period.End))
                {
                    canDuty = false;
                    break;
                }
            }
            return canDuty;
        }

        private void GetWorkersGroups(List<Worker> workers, 
            out List<Worker> dutyWorkers, 
            out List<Worker> existingCustomerSupport, 
            out List<Worker> newCustomerSupport, 
            out List<Worker> vipCustomerSupport,
            out List<Worker> dutyOnPlanning,
            DateTime date)
        {
            existingCustomerSupport = new List<Worker>() { };
            newCustomerSupport = new List<Worker>() { };
            vipCustomerSupport = new List<Worker>() { };
            dutyWorkers = new List<Worker>() { };
            dutyOnPlanning = new List<Worker>() { };
            foreach (Worker w in workers)
            {
                СanDuty(w, date);
                if (w.IsDuty)
                {
                    dutyWorkers.Add(w);
                    continue;
                }
                if (/*(IsPlanningDay(date)) && */w.IsDutyOnWedn)
                {
                    dutyOnPlanning.Add(w);
                    continue;
                }
                if ((w.IsDutyOnLetters) || (!СanDuty(w, date)))
                {
                    //notDutyWorkers.Add(w);
                    continue;
                }
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
            existingCustomerSupport = GetRandomPermutation<Worker>(data: existingCustomerSupport);
            newCustomerSupport = GetRandomPermutation<Worker>(data: newCustomerSupport);
            vipCustomerSupport = GetRandomPermutation<Worker>(data: vipCustomerSupport);
        }

        private List<int> GetArrayOfZeroesAndOnes(int countHours, List<int> numbersOfHours)
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

        private int GetSumm(List<int> list) 
        {
            int summ = 0;
            foreach (int item in list)
            {
                summ += item;   
            }
            return summ;
        }

        /*private List<int> GetUniqSiq(int length, int sequenceLength)
        {
            List<int> data = new List<int> { };
            List<int> sequence = new List<int> { }; 
            int index;
            for (int i = 0; i < length; i++)
            {
                data.Add(i);
            }

            Random rand = new Random();
            while (sequence.Count < sequenceLength)
            {
                index = rand.Next(0, data.Count - 1);
                sequence.Add(data[index]);
                data.RemoveAt(index);
            }
            return sequence;
        }
        */
        private List<int> GetSlotNumbersForWorker(ref List<int> hoursInDay, int countSlotsForWorker, bool isDutyWorker, Worker worker)
        {
            int maxCountAttempts = 300;
            int number, temp, countFreeSlots;
            int countHoursInDay = hoursInDay.Count;
            countFreeSlots = GetSumm(hoursInDay);
            Random rand = new Random();
            int countAttemps = 0;
            List<int> listNumbers = new List<int>();
            if (isDutyWorker)
            {
                listNumbers.Add(0);
                listNumbers.Add(10);
                listNumbers.Add(11);
                countSlotsForWorker = 3;
            }
            if (worker.IsDutyOnWedn)
            {
                listNumbers.Add(1);
                countSlotsForWorker = worker.GetNumberHoursForDuty() - 1;
            }
            for (int i = 0; i < countSlotsForWorker; i++)
            {
                countAttemps = 0;
                if ((countFreeSlots == 0) || (countAttemps == maxCountAttempts))
                {
                    break;
                }
                number = rand.Next(0, countHoursInDay - 1);
                while (listNumbers.Contains(number) || hoursInDay[number] == 0) {
                    countAttemps++;
                    number = rand.Next(0, countHoursInDay);
                    if (countAttemps == maxCountAttempts)
                        break;
                }
                if (countAttemps == maxCountAttempts)
                    break;
                listNumbers.Add(number);
                //проверка на подряд идущие часы
                List<int> arrOfZeroesAndOnes = GetArrayOfZeroesAndOnes(countHoursInDay, listNumbers);
                if (IsTwoHoursConsistently(arrOfZeroesAndOnes))
                {
                    listNumbers.Remove(number);
                    i--;
                    if (countAttemps == maxCountAttempts)
                    {
                        break;
                    }
                }
                else
                {
                    countFreeSlots--;
                    temp = hoursInDay[number];
                    hoursInDay.RemoveAt(number);
                    temp--;
                    hoursInDay.Insert(number, temp);
                }                  
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
            }
            return slotsDto;
        }
        private void ResetSlots(List<Hour> hours)
        {
            foreach (var h in hours)
            {
                List<Slot> slotsForRemove = new List<Slot> { }; 
                var slots = _db.Slots.Where(s => s.HourId == h.Id).ToList();
                int countSlots = 0;
                foreach (var slot in slots)
                {
                    countSlots++;
                    if (h.MinCount < countSlots)
                    {
                        slotsForRemove.Add(slot);
                        continue;
                    }
                    slot.WorkerId = null;
                }
                if (h.MinCount < countSlots)
                {
                    slots.RemoveRange(h.MinCount, slotsForRemove.Count());
                    _db.Slots.RemoveRange(slotsForRemove);
                }
                    
                while (countSlots < h.MinCount)
                {
                    slots.Add(GetNewSlot(countSlots++, h.Id));
                }
                _db.Slots.UpdateRange(slots);        
            }
            _db.SaveChanges();
        }

        private Slot GetNewSlot(int slotIndex, int hourId)
        {
            Slot slot = new Slot();
            slot.Index = slotIndex++;
            slot.HourId = hourId;
            return slot;
        }
        private void CreateSlots(List<Hour> hours)
        {

            foreach (var h in hours)
            {
                var slotIndex = 0;
                List<Slot> slotsInHour = new List<Slot> { };
                for (var i = 0; i < h.MinCount; i++)
                {
                    /*var slot = new Slot();
                    slot.Index = slotIndex++;
                    slot.HourId = h.Id;*/
                    slotsInHour.Add(GetNewSlot(slotIndex++, h.Id));
                }
                _db.Slots.AddRange(slotsInHour);
            }
            _db.SaveChanges();
        }

        private static List<T> GetRandomPermutation<T>(List<T> data)
        {
            List<T> result = new List<T> { };
            Random rand = new Random();
            for (int i = 0; i < data.Count; i++)
            {
                int position = rand.Next(0, i);
                result.Insert(position, data[i]);
            }
            return result;
        }

        private Worker GetDutyWorker(List<Worker> workers)
        {
            return workers.FirstOrDefault(w => w.IsDuty == true);   
        }

        private void FillSlots(Worker worker, List<int> slotNumbers, List<Hour> hours)
        {
            List<int> hourIds = hours.Select(h => h.Id).ToList();
            Dictionary<int, List<Slot>> slotsInCurrentHourById = _db.Slots
                .Where(s => hourIds.Contains(s.HourId))
                .GroupBy(s => s.HourId)
                .ToDictionary(g => g.Key, g => g.ToList());
            foreach (var slotNumber in slotNumbers)
            {
                List<Slot> slotsInCurrentHour = slotsInCurrentHourById[hours[slotNumber].Id];
                foreach (var slotInCurrentHour in slotsInCurrentHour)
                {
                    if (slotInCurrentHour.WorkerId == null)
                    {
                        slotInCurrentHour.WorkerId = worker.Id;
                        _db.Slots.Update(slotInCurrentHour);
                        break;
                    }
                }
            }
            _db.SaveChanges();
        }

        private void FillSlotsForGroup(List<Worker> workers, 
            int countSlotsForWorker, 
            ref List<Hour> hours, 
            ref List<int> countFreeSlots, 
            ref List<Worker> notBusyWorkers,
            bool isDuty)
        {
            foreach (var w in workers)
            {
                if (GetSumm(countFreeSlots) != 0)
                {
                    List<int> slotsNumber = GetSlotNumbersForWorker(ref countFreeSlots, countSlotsForWorker, isDuty, w);
                    FillSlots(w, slotsNumber, hours);
                }
                else
                {
                    notBusyWorkers.Add(w);
                }

            }
        }

        private void GetData(DateTime date, ref List<Hour> hours, ref List<Worker> workers, ref List<int> countFreeSlots) 
        {
            hours = _db.Hours
                .Where(h => h.Date == date)
                .ToList();
            workers = _db.Workers.ToList();
            foreach (var h in hours)
            {
                countFreeSlots.Add(h.MinCount);
            }

        }

        private void ChekingExistenceOfSlots(List<Hour> hours)
        {
            var slotsInHour = _db.Slots.Where(s => s.HourId == hours[0].Id).ToList();
            if (slotsInHour.Count == 0)
            {
                CreateSlots(hours);
            }
            else
            {
                ResetSlots(hours);
            }
        }

        private Boolean IsPlanningDay(DateTime date)
        {
            return (date.DayOfWeek == DayOfWeek.Wednesday) ? true : false;    
        }

        public List<SlotDto> DistributeSlots(DateTime date)
        {
            var slots = new List<SlotDto>();
            var hours = new List<Hour>();
            var workers = new List<Worker>();
            var countFreeSlots = new List<int>();
            int countHoursForDuty = 6;
            int countHoursForExistingCustomerSupport = 5;
            int countHoursForDefaultGroup = 1;

            GetData(date, ref hours, ref workers, ref countFreeSlots);
            ChekingExistenceOfSlots(hours); 

            List<Worker> existingCustomerSupport = new List<Worker>() { };
            List<Worker> newCustomerSupport = new List<Worker>() { };
            List<Worker> vipCustomerSupport = new List<Worker>() { };
            List<Worker> notDutyWorkers = new List<Worker>() { };
            List<Worker> dutyWorkers = new List<Worker>() { };
            List<Worker> notBusyWorkers = new List<Worker>() { };
            List<Worker> dutyOnPlanning = new List<Worker>() { };

            GetWorkersGroups(workers, out dutyWorkers, out existingCustomerSupport, out newCustomerSupport, out vipCustomerSupport, out dutyOnPlanning,  date);

            FillSlotsForGroup(dutyWorkers, countHoursForDuty, ref hours, ref countFreeSlots, ref notBusyWorkers, isDuty: true);
            FillSlotsForGroup(dutyOnPlanning, countHoursForDefaultGroup, ref hours, ref countFreeSlots, ref notBusyWorkers, isDuty: false);
            FillSlotsForGroup(existingCustomerSupport, countHoursForExistingCustomerSupport, ref hours, ref countFreeSlots, ref notBusyWorkers, isDuty: false);
            FillSlotsForGroup(newCustomerSupport, countHoursForDefaultGroup, ref hours, ref countFreeSlots, ref notBusyWorkers, isDuty: false);
            FillSlotsForGroup(vipCustomerSupport, countHoursForDefaultGroup, ref hours, ref countFreeSlots, ref notBusyWorkers, isDuty: false);

            slots = GetSlotsDto(hours);
            return slots;
        }
    }
}
