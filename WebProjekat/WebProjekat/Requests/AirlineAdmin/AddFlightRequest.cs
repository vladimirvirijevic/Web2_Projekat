using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebProjekat.Requests.AirlineAdmin
{
    public class AddFlightRequest
    {

        public string LocationFrom { get; set; }
        public string LocationTo { get; set; }
        public string DateOfTakingOff { get; set; }
        public string TimeOfTakingOff { get; set; }
        public string DateOfLanding { get; set; }
        public string TimeOfLanding { get; set; }
        public string DurationOfFlight { get; set; }
        public string  DistanceOfFlight { get; set; }
        public string NumberOfTransfers { get; set; }
        public string LocationOfTransfers { get; set; }
        public string PriceOfTicketOfFlight { get; set; }



    }
}
