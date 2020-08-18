using System;
using System.Collections.Generic;

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

        public bool ValidateDateRange(DateTime from, DateTime until)
        {
            if (from > until)
            {
                return false;
            }

            return true;
        }
    }
}
