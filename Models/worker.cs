using dutyChart.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

public class Worker
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsDuty { get; set; }
    public bool IsDutyOnWedn { get; set; }
    public bool IsDutyOnLetters { get; set; }
    public int IdGroup { get; set; }
    public string Color { get; set; }
    public int CountAbsencePeriod { get; set; }
    private string _unwantedSlotsJson { get; set; }
    protected List<AbsentPeriod> _absentPeriods { get; set; } = new List<AbsentPeriod>();
    public IReadOnlyCollection<int> UnwantedSlots => JsonConvert.DeserializeObject<List<int>>(_unwantedSlotsJson ?? "[]");
    private string _desirableSlotsJson { get; set; }

    public IReadOnlyCollection<int> DesirableSlots => JsonConvert.DeserializeObject<List<int>>(_desirableSlotsJson ?? "[]");

    public void SetUnwantedSlots(List<int> slots)
    {
        _unwantedSlotsJson = JsonConvert.SerializeObject(slots);
    }

    public void SetDesirableSlots(List<int> slots)
    {
        _desirableSlotsJson = JsonConvert.SerializeObject(slots);
    }
    
    public IReadOnlyCollection<AbsentPeriod> AbsentPeriods
    {
        get { return _absentPeriods.ToList(); }
    }

    public static Expression<Func<Worker, IEnumerable<AbsentPeriod>>> AbsentPeriodsProperty => (s => s._absentPeriods);
    public static Expression<Func<Worker, string>> UnwantedSlotsJsonProperty => (of => of._unwantedSlotsJson);
    public static Expression<Func<Worker, string>> DesirableSlotsJsonProperty => (of => of._desirableSlotsJson);

    public int GetNumberHoursForDuty(List<Group> groups)
    {
        
        if (this.IsDuty) return groups.FirstOrDefault(x => x.Name == "Сменники").NumberDutyHours;
        if (this.IdGroup == 3) return groups.FirstOrDefault(x => x.Name == "Группа поддержки").NumberDutyHours;
        if (this.IdGroup == 2) return groups.FirstOrDefault(x => x.Name == "Группа запуска").NumberDutyHours;
        if (this.IdGroup == 1) return groups.FirstOrDefault(x => x.Name == "Группа поддержки VIP").NumberDutyHours;
        return 1;
    }
}
