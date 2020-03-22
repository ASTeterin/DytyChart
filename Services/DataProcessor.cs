using System;
using System.Collections.Generic;
using System.Linq;
using dutyChart.Dto;

namespace dutyChart.Models
{
    public interface IDataProcessor
    {
        List<SlotDto> DistributeSlots( DateTime date );
    }

    public class DataProcessor
    {
        readonly ApplicationContext _db;

        public DataProcessor( ApplicationContext db )
        {
            _db = db;
        }

        private bool СanDuty( Worker worker, DateTime date )
        {
            List<AbsentPeriod> absentPeriods = _db.AbsentPeriods.Where( p => p.WorkerId == worker.Id ).ToList();
            bool canDuty = true;
            foreach ( var period in absentPeriods )
            {
                if ( ( date >= period.Start ) && ( date <= period.End ) )
                {
                    canDuty = false;
                    break;
                }
            }
            return canDuty;
        }

        private WorkerInDay GetWorkerInDay(int workerId, DateTime date)
        {
            return _db.WorkerInDays.FirstOrDefault(x => ((x.Date == date) && (x.WorkerId == workerId)));
        }

        private int GetDutyWorkerGroupId(List<Worker> workers, DateTime date)
        {
            var id = 0;
            foreach (Worker w in workers)
            {
                WorkerInDay workerInDay = GetWorkerInDay(w.Id, date);
                if (workerInDay.IsDuty) 
                {
                    id = w.IdGroup;
                    break;
                }
            }
            return id;
        }

        private List<List<Worker>> GetGroups(List<Worker> workers, DateTime date)
        {
            List<List<Worker>> workersInGroupByPriority = new List<List<Worker>> { };
            WorkerInDay workerInDay = new WorkerInDay();
            var idDutyWorkerGroup = GetDutyWorkerGroupId(workers, date);
            List<Worker> dutyGroup = new List<Worker> { };
            List<Worker> dutyOnLettersGroup = new List<Worker> { };
            List<Worker> dutyOnPlanningGroup = new List<Worker> { };
            List<Group> groups = _db.Groups.OrderBy(g => g.Priority).ToList();

            foreach (Group g in groups)
            {
                workersInGroupByPriority.Add(new List<Worker>());
            }
            foreach (Worker w in workers)
            {
                workerInDay = GetWorkerInDay(w.Id, date);
                if (workerInDay == null)
                    continue;

                if (workerInDay.IsDuty)
                {
                    dutyGroup.Add(w);
                    idDutyWorkerGroup = w.IdGroup;
                    continue;
                }
                if (workerInDay.IsDutyOnLetters)
                {
                    dutyOnLettersGroup.Add(w);
                    continue;
                }
                if (workerInDay.IsDutyOnWedn)
                {
                    dutyOnPlanningGroup.Add(w);
                    continue;
                }
                if ((workerInDay.IsDutyOnLetters) || (!СanDuty(w, date)) || (w.IdGroup == idDutyWorkerGroup))
                {
                    //notDutyWorkers.Add(w);
                    continue;
                }
                var groupIndex = groups.FindIndex(g => g.Id == w.IdGroup);
                workersInGroupByPriority[groupIndex].Add(w);
                
            }
            workersInGroupByPriority.Insert(0, dutyOnPlanningGroup);
            workersInGroupByPriority.Insert(0, dutyGroup);
            //workersInGroupByPriority.Add();
            return workersInGroupByPriority;
        }

        private List<int> GetArrayOfZeroesAndOnes( int countHours, List<int> numbersOfHours )
        {
            List<int> listOfZerosAndOnes = new List<int>();
            for ( var i = 0; i < countHours; i++ )
            {
                listOfZerosAndOnes.Add( 0 );
            }
            foreach ( var index in numbersOfHours )
            {
                listOfZerosAndOnes[ index ] = 1;
            }
            return listOfZerosAndOnes;
        }

        public Boolean IsTwoHoursConsistently( List<int> listOfZerosAndOnes )
        {
            var count = 1;
            for ( int i = 1; i < listOfZerosAndOnes.Count; i++ )
            {
                if ( ( listOfZerosAndOnes[ i ] == 1 ) && ( listOfZerosAndOnes[ i - 1 ] == 1 ) )
                {
                    count++;
                    if ( count > 2 )
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

        private int GetSumm( List<int> list )
        {
            int summ = 0;
            foreach ( int item in list )
            {
                summ += item;
            }
            return summ;
        }
        private void GenerateSlotsForDutyWorker( ref List<int> listNumbers, ref int countSlotsForWorker )
        {
            listNumbers.Add(0);
            listNumbers.Add(10);
            listNumbers.Add(11);
            countSlotsForWorker -= 3;
        }

        private void ReduceCountFreeSlotsInHour( ref int countFreeSlots, ref List<int> hoursInDay, int index )
        {
            countFreeSlots--;
            int temp = hoursInDay[ index ];
            hoursInDay.RemoveAt( index );
            temp--;
            hoursInDay.Insert( index, temp );
        }

        private List<int> GetSlotNumbersForWorker( ref List<int> hoursInDay, ref int countSlotsForWorker, Worker worker, DateTime date )
        {
            int maxCountAttempts = 50;
            int number, countFreeSlots;
            int countHoursInDay = hoursInDay.Count;
            countFreeSlots = GetSumm( hoursInDay );
            Random rand = new Random();
            int countAttemps = 0;
            List<int> listNumbers = new List<int>();
            WorkerInDay workerInDay = GetWorkerInDay(worker.Id, date);
            List<Group> groups = _db.Groups.ToList();
            if ( workerInDay.IsDuty )
            {
                GenerateSlotsForDutyWorker( ref listNumbers, ref countSlotsForWorker );
                ReduceCountFreeSlotsInHour(ref countFreeSlots, ref hoursInDay, 0);
                ReduceCountFreeSlotsInHour(ref countFreeSlots, ref hoursInDay, 10);
                ReduceCountFreeSlotsInHour(ref countFreeSlots, ref hoursInDay, 11);
            }
            if ( workerInDay.IsDutyOnWedn )
            {
                listNumbers.Add( 1 );
                ReduceCountFreeSlotsInHour(ref countFreeSlots, ref hoursInDay, 1);
                countSlotsForWorker = _db.Groups.FirstOrDefault(g => g.Id == worker.IdGroup).NumberDutyHours - 1;
                //countSlotsForWorker = worker.GetNumberHoursForDuty(groups) - 1;
            }
            for ( int i = 0; i < countSlotsForWorker; i++ )
            {
                
                countAttemps = 0;
                number = rand.Next( 0, countHoursInDay - 1 );
                while (listNumbers.Contains(number) || (hoursInDay[number] <= 0))
                {
                    countAttemps++;
                    number = rand.Next( 0, countHoursInDay - 1 );
                    if ( countAttemps == maxCountAttempts )
                        break;
                }
                

                if ((countFreeSlots == 0) || (countAttemps == maxCountAttempts) )
                    break;

                listNumbers.Add(number);
                //проверка на подряд идущие часы
                List<int> arrOfZeroesAndOnes = GetArrayOfZeroesAndOnes( countHoursInDay, listNumbers );
                if (IsTwoHoursConsistently(arrOfZeroesAndOnes))
                {
                    countAttemps++;
                    listNumbers.Remove(number);
                    i--;
                    if ( countAttemps == maxCountAttempts )
                    {
                        break;
                    }
                }
                else
                {
                    ReduceCountFreeSlotsInHour( ref countFreeSlots, ref hoursInDay, number );
                }
            }
            return listNumbers;
        }

        private List<SlotDto> GetSlotsDto( List<Hour> hours )
        {
            List<SlotDto> slotsDto = new List<SlotDto> { };
            foreach ( var hour in hours )
            {
                var slotsInHour = _db.Slots.Where( s => s.HourId == hour.Id ).ToList();
                foreach ( var s in slotsInHour )
                {
                    slotsDto.Add( new SlotDto
                    {
                        HourId = s.HourId,
                        Id = s.Id,
                        Index = s.Index,
                        WorkerId = s.WorkerId
                    } );
                }
            }
            return slotsDto;
        }
        private void ResetSlots( List<Hour> hours )
        {
            foreach ( var h in hours )
            {
                List<Slot> slotsForRemove = new List<Slot> { };
                var slots = _db.Slots.Where( s => s.HourId == h.Id ).ToList();
                int countSlots = 0;
                foreach ( var slot in slots )
                {
                    countSlots++;
                    if ( h.MinCount < countSlots )
                    {
                        slotsForRemove.Add( slot );
                        continue;
                    }
                    slot.WorkerId = null;
                }
                if ( h.MinCount < countSlots )
                {
                    slots.RemoveRange( h.MinCount, slotsForRemove.Count() );
                    _db.Slots.RemoveRange( slotsForRemove );
                }

                while ( countSlots < h.MinCount )
                {
                    slots.Add( GetNewSlot( countSlots++, h.Id ) );
                }
                _db.Slots.UpdateRange( slots );
            }
            _db.SaveChanges();
        }

        private Slot GetNewSlot( int slotIndex, int hourId )
        {
            Slot slot = new Slot();
            slot.Index = slotIndex++;
            slot.HourId = hourId;
            return slot;
        }
        private void CreateSlots( List<Hour> hours )
        {

            foreach ( var h in hours )
            {
                var slotIndex = 0;
                List<Slot> slotsInHour = new List<Slot> { };
                for ( var i = 0; i < h.MinCount; i++ )
                {
                    slotsInHour.Add( GetNewSlot( slotIndex++, h.Id ) );
                }
                _db.Slots.AddRange( slotsInHour );
            }
            _db.SaveChanges();
        }

        private static List<T> GetRandomPermutation<T>( List<T> data )
        {
            List<T> result = new List<T> { };
            Random rand = new Random();
            for ( int i = 0; i < data.Count; i++ )
            {
                int position = rand.Next( 0, i );
                result.Insert( position, data[ i ] );
            }
            return result;
        }

        private Worker GetDutyWorker( List<Worker> workers )
        {
            return workers.FirstOrDefault( w => w.IsDuty == true );
        }

        private void FillSlots( Worker worker, List<int> slotNumbers, List<Hour> hours )
        {
            List<int> hourIds = hours.Select( h => h.Id ).ToList();
            Dictionary<int, List<Slot>> slotsInCurrentHourById = _db.Slots
                .Where( s => hourIds.Contains( s.HourId ) )
                .GroupBy( s => s.HourId )
                .ToDictionary( g => g.Key, g => g.ToList() );
            foreach ( var slotNumber in slotNumbers )
            {
                List<Slot> slotsInCurrentHour = slotsInCurrentHourById[ hours[ slotNumber ].Id ];
                foreach ( var slotInCurrentHour in slotsInCurrentHour )
                {
                    if ( slotInCurrentHour.WorkerId == null )
                    {
                        slotInCurrentHour.WorkerId = worker.Id;
                        _db.Slots.Update( slotInCurrentHour );
                        break;
                    }
                }
            }
            _db.SaveChanges();
        }

        private void FillSlotsForGroup( List<Worker> workers,
            int countSlotsForWorker,
            ref List<Hour> hours,
            ref List<int> countFreeSlots,
            ref List<Worker> notBusyWorkers,
            DateTime date)
        {
            foreach ( var w in workers )
            {
                if ( GetSumm( countFreeSlots ) != 0 )
                {
                    List<int> slotsNumber = GetSlotNumbersForWorker( ref countFreeSlots, ref countSlotsForWorker, w , date);
                    FillSlots( w, slotsNumber, hours );
                }
                else
                {
                    notBusyWorkers.Add( w );
                }
            }
        }

        private void GetData( DateTime date, ref List<Hour> hours, ref List<Worker> workers, ref List<int> countFreeSlots )
        {
            hours = _db.Hours.Where( h => h.Date == date ).ToList();
            workers = _db.Workers.ToList();
            foreach ( var h in hours )
            {
                countFreeSlots.Add( h.MinCount );
            }

        }

        private void ChekingExistenceOfSlots( List<Hour> hours )
        {
            var slotsInHour = _db.Slots.Where( s => s.HourId == hours[ 0 ].Id ).ToList();
            if ( slotsInHour.Count == 0 )
            {
                CreateSlots( hours );
            }
            else
            {
                ResetSlots( hours );
            }
        }

        private Boolean IsPlanningDay( DateTime date )
        {
            return ( date.DayOfWeek == DayOfWeek.Wednesday ) ? true : false;
        }

        public List<SlotDto> DistributeSlots( DateTime date )
        {
            var slots = new List<SlotDto>();
            var hours = new List<Hour>();
            var workers = new List<Worker>();
            var countFreeSlots = new List<int>();
            //int countHoursForDuty = _db.Groups.FirstOrDefault(g => g.Name == "Сменники").NumberDutyHours;
            //int countHoursForExistingCustomerSupport = _db.Groups.FirstOrDefault(g => g.Name == "Группа поддержки").NumberDutyHours;
            //int countHoursForDefaultGroup = _db.Groups.FirstOrDefault(g => g.Name == "Группа поддержки VIP").NumberDutyHours; ;
            var dateUTC = date.ToUniversalTime();

            GetData( date, ref hours, ref workers, ref countFreeSlots );
            ChekingExistenceOfSlots( hours );

            List<List<Worker>> workersInGroupByPriority = new List<List<Worker>> { };
            List<Worker> notBusyWorkers = new List<Worker>();
            List<Group> groups = _db.Groups.OrderBy(g => g.Priority).ToList();

            var dutyOnLettersGroup = new Group();
            dutyOnLettersGroup.NumberDutyHours = 5;
            groups.Insert(0, dutyOnLettersGroup);

            var dutyGroup = new Group();
            dutyGroup.NumberDutyHours = 6;
            groups.Insert(0, dutyGroup);
            workersInGroupByPriority = GetGroups(workers, date);
            var i = 0;
            foreach (List<Worker> group in workersInGroupByPriority)
            {
                if (groups[i].NumberDutyHours == 0) {
                    i++;
                    continue;
                }  
                FillSlotsForGroup(group, groups[i++].NumberDutyHours, ref hours, ref countFreeSlots, ref notBusyWorkers, date);
            }

            /*
            List<Worker> existingCustomerSupport = new List<Worker>();
            List<Worker> newCustomerSupport = new List<Worker>();
            List<Worker> vipCustomerSupport = new List<Worker>();
            List<Worker> notDutyWorkers = new List<Worker>();
            List<Worker> dutyWorkers = new List<Worker>();
            
            List<Worker> dutyOnPlanning = new List<Worker>();
            List<Worker> replacementWorkers = new List<Worker>();

            GetWorkersGroups( workers, out dutyWorkers, out existingCustomerSupport, out newCustomerSupport, out vipCustomerSupport, out dutyOnPlanning, out replacementWorkers, date );

            FillSlotsForGroup( dutyWorkers, countHoursForDuty, ref hours, ref countFreeSlots, ref notBusyWorkers, date );
            FillSlotsForGroup( dutyOnPlanning, countHoursForDefaultGroup, ref hours, ref countFreeSlots, ref notBusyWorkers, date );
            FillSlotsForGroup( existingCustomerSupport, countHoursForExistingCustomerSupport, ref hours, ref countFreeSlots, ref notBusyWorkers, date );
            FillSlotsForGroup( newCustomerSupport, countHoursForDefaultGroup, ref hours, ref countFreeSlots, ref notBusyWorkers, date );
            FillSlotsForGroup( vipCustomerSupport, countHoursForDefaultGroup, ref hours, ref countFreeSlots, ref notBusyWorkers, date );
            */
            slots = GetSlotsDto( hours );
            return slots;
        }
    }
}
