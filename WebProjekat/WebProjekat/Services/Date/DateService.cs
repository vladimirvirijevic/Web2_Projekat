using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace WebProjekat.Services.Date
{
    public class DateService : IDateService
    {
        public int DaysBetweenDates(DateTime from, DateTime until)
        {
            int days = (int)((until - from).TotalDays) + 1;

            return days;
        }

        public List<DateTime> DaysListBetweenDates(DateTime from, DateTime until)
        {
            var dates = new List<DateTime>();

            for (var date = from; date <= until; date = date.AddDays(1))
            {
                dates.Add(date);
            }

            return dates;
        }

        public List<string> DaysListBetweenDatesAsString(DateTime from, DateTime until)
        {
            var dates = new List<string>();

            for (var date = from; date <= until; date = date.AddDays(1))
            {
                var dateAsString = date.ToString("yyyy-MM-dd");
                dates.Add(dateAsString);
            }

            return dates;
        }

        public bool ValidateDateRange(DateTime from, DateTime until)
        {
            if (from > until)
            {
                return false;
            }

            return true;
        }

        public static DateTime FirstDateOfWeek(int year, int weekOfYear, CultureInfo ci)
        {
            DateTime jan1 = new DateTime(year, 1, 1);
            int daysOffset = (int)ci.DateTimeFormat.FirstDayOfWeek - (int)jan1.DayOfWeek;

            DateTime firstWeekDay = jan1.AddDays(daysOffset);
            int firstWeek = ci.Calendar.GetWeekOfYear(jan1, ci.DateTimeFormat.CalendarWeekRule, ci.DateTimeFormat.FirstDayOfWeek);
            if ((firstWeek <= 1 || firstWeek >= 52) && daysOffset >= -3)
            {
                weekOfYear -= 1;
            }

            return firstWeekDay.AddDays(weekOfYear * 7);
        }

        public int GetWeekOfYear(DateTime time)
        {
            DayOfWeek day = CultureInfo.InvariantCulture.Calendar.GetDayOfWeek(time);
            if (day >= DayOfWeek.Monday && day <= DayOfWeek.Wednesday)
            {
                time = time.AddDays(3);
            }

            return CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(time, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
        }

        public List<DateTime> GetDaysOfWeek(int year, int weekNumber)
        {
            CultureInfo customCulture = new CultureInfo("en-US");
            var firstDayOfWeek = FirstDateOfWeek(year, weekNumber, customCulture);
            firstDayOfWeek = firstDayOfWeek.AddDays(1);

            List<DateTime> daysThisWeek = Enumerable.Range(0, 7)
                .Select(d => firstDayOfWeek.AddDays(d))
                .ToList();

            return daysThisWeek;
        }

        public List<DateTime> GetDatesOfMonth(int year, int month)
        {
            return Enumerable.Range(1, DateTime.DaysInMonth(year, month))  // Days: 1, 2 ... 31 etc.
                             .Select(day => new DateTime(year, month, day)) // Map each day to a date
                             .ToList(); // Load dates into a list
        }
    }
}
