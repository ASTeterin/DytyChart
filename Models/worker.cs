using Newtonsoft.Json;
using System;
using System.Collections.Generic;
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

    public IReadOnlyCollection<int> UnwantedSlots => JsonConvert.DeserializeObject<List<int>>(_unwantedSlotsJson ?? "[]");

    private string _desiredSlotsJson { get; set; }

    public IReadOnlyCollection<int> DesiredSlots => JsonConvert.DeserializeObject<List<int>>(_desiredSlotsJson ?? "[]");

    public void SetUnwantedSlots(List<int> slots)
    {
        _unwantedSlotsJson = JsonConvert.SerializeObject(slots);
    }

    public static Expression<Func<Worker, string>> UnwantedSlotsJsonProperty => (of => of._unwantedSlotsJson);
    public void SetDesiredSlots(List<int> slots)
    {
        _desiredSlotsJson = JsonConvert.SerializeObject(slots);
    }

    public static Expression<Func<Worker, string>> DesiredSlotsJsonProperty => (of => of._desiredSlotsJson);
}
