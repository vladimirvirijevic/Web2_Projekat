using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebProjekat.Requests.FlightReservation
{
    public class MakeReservationRequest
    {
     
        public int SeatOfReservation { get; set; }
        public string FirstNameOfPersonWhoSits { get; set; }
        public string SecondNameOfPersonWhoSits { get; set; }
        public string PhoneOfUserWhoSits { get; set; }
        public string CityOfUserWhoSits { get; set; }
        public string NumberOfPassport { get; set; }
        public string NumberOfPassportOfNonUser { get; set; }
        public string StatusOfReservation { get; set; }
        public string DateOfReservation { get; set; }
        





    }
}
