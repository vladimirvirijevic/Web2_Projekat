using WebProjekat.Requests.RentacarAdmin;

namespace WebProjekat.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int Seats { get; set; }
        public int Year { get; set; }
        public int Grade { get; set; }
        public string Type{ get; set; }
        public string AvailableFrom{ get; set; }
        public string AvailableUntil{ get; set; }
        public string PickupLocation{ get; set; }
        public string DropoffLocation{ get; set; }
        public virtual RentacarBranch Branch { get; set; }

        public Car() { }

        public Car(CreateCarRequest carInfo)
        {
            Brand = carInfo.Brand;
            Model = carInfo.Model;
            Seats = carInfo.Seats;
            Year = carInfo.Year;
            Type = carInfo.Type;
            AvailableFrom = carInfo.AvailableFrom;
            AvailableUntil = carInfo.AvailableUntil;
            PickupLocation = carInfo.PickupLocation;
            DropoffLocation = carInfo.DropoffLocation;
        }
    }
}
