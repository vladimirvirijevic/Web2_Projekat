using WebProjekat.Requests.Rentacar;

namespace WebProjekat.Models
{
    public class CarReservation
    {
        public int Id { get; set; }
        public int Days { get; set; }
        public string Status { get; set; }
        public double TotalPrice { get; set; }
        public string PickupDate { get; set; }
        public string DropoffDate { get; set; }

        public virtual User User { get; set; }
        public virtual Car Car { get; set; }

        public CarReservation() { }

        public CarReservation(BookCarRequest bookingInfo)
        {
            PickupDate = bookingInfo.PickupDate;
            DropoffDate = bookingInfo.DropoffDate;
        }

        public CarReservation(FastBookCarRequest bookingInfo)
        {
            PickupDate = bookingInfo.PickupDate;
            DropoffDate = bookingInfo.DropoffDate;
        }
    }
}
