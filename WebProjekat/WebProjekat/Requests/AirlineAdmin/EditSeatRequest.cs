using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebProjekat.Requests.AirlineAdmin
{
    public class EditSeatRequest
    {
        public int NumberOfSeat { get; set; }
        public bool IsItAvailable { get; set; }
        public bool DoesItExist { get; set; }

    }
}
