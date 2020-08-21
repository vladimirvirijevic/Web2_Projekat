using System.Collections.Generic;
using WebProjekat.Models;

namespace WebProjekat.Responses.RentacarAdmin
{
    public class GetEarningsResponse
    {
        public double TotalEarning { get; set; }
        public List<CarReservation> Reservations { get; set; } = new List<CarReservation>();
    }
}
