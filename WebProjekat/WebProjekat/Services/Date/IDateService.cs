using System;
using System.Collections.Generic;

namespace WebProjekat.Services.Date
{
    public interface IDateService
    {
        bool ValidateDateRange(DateTime from, DateTime until);
        int DaysBetweenDates(DateTime from, DateTime until);
        List<DateTime> DaysListBetweenDates(DateTime from, DateTime until);
        List<string> DaysListBetweenDatesAsString(DateTime from, DateTime until);
        int GetWeekOfYear(DateTime time);
        List<DateTime> GetDaysOfWeek(int year, int weekNumber);
        List<DateTime> GetDatesOfMonth(int year, int month);
    }
}
