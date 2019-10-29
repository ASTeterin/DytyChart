using System;
using System.Collections.Generic;

public class Worker
{
    public int Id { get; set; }
    public string Name { get; set; }    // название 
    public bool IsDuty { get; set; }  // цена
    public bool IsDutyOnWedn { get; set; }
    public bool IsDutyOnLetters { get; set; }
    //public List<TimeSpan> DesiredTimes { get; set; }
    //public List<TimeSpan> UnwantedTimes { get; set; }
    public int[] DesiredTimes { get; set; }
    public int[] UnwantedTimes { get; set; }
}
