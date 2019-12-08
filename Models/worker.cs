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

    public void SetUnwantedSlots(List<int> slots)
    {
        _unwantedSlotsJson = JsonConvert.SerializeObject(slots);
    }

    public static Expression<Func<Worker, string>> UnwantedSlotsJsonProperty => (of => of._unwantedSlotsJson);
}
