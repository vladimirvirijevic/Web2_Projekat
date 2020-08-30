using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebProjekat.Models
{
    public class FlightReservation
    {
        public int Id { get; set; }
        public int PriceOfReservation { get; set; }
        public int SeatOfReservation { get; set; }
        public string FirstNameOfPersonWhoSits { get; set; }
        public string SecondNameOfPersonWhoSits { get; set; }
        public string PhoneOfUserWhoSits { get; set; }
        public string CityOfUserWhoSits { get; set; }
        public string NumberOfPassport { get; set; }
        public string StatusOfReservation { get; set; }
        public string DateOfReservation { get; set; }
        public virtual User UserWhoReserved { get; set; }
        public virtual Flight FlightOfReservation { get; set; }
        public virtual AirplaneCompany AirplaneCompanyOfReservation { get; set; }


    }
}
