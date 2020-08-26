using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebProjekat.Models
{
    public class Seat
    {
        public int Id { get; set; }
        public int NumberOfSeat { get; set; }
        public string FirstNameOfUser { get; set; }
        public string LastNameOfUser { get; set; }
        public string CityOfNonUser { get; set; }
        public string PhoneOfNonUser { get; set; }
        public bool IsItReserved { get; set; }
        public bool IsItAvailable { get; set; }
        public bool DoesItExist { get; set; }
        public virtual User WhoReservedIt { get; set; }
        public virtual AirplaneCompany WhoCreatedIt { get; set;}
        public virtual Flight FlightBelonging { get; set; }
    }
}
