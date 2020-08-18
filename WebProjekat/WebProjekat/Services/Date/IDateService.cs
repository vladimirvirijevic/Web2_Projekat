using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace WebProjekat.Services.Date
{
    public interface IDateService
    {
        bool ValidateDateRange(DateTime from, DateTime until);
        int DaysBetweenDates(DateTime from, DateTime until);
        List<DateTime> DaysListBetweenDates(DateTime from, DateTime until);
    }
}
