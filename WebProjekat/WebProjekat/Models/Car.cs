using System.Collections.Generic;
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
        public double PricePerDay { get; set; }
        public string Type{ get; set; }
        public string PickupLocation{ get; set; }
        public string DropoffLocation{ get; set; }
        public virtual RentacarBranch Branch { get; set; }
        public virtual List<CarReservation> CarReservations { get; set; } = new List<CarReservation>();
        public virtual List<CarDiscount> Discounts { get; set; } = new List<CarDiscount>();
        public virtual List<GradeCar> Grades { get; set; } = new List<GradeCar>();

        public Car() { }

        public Car(CreateCarRequest carInfo)
        {
            Brand = carInfo.Brand;
            Model = carInfo.Model;
            Seats = carInfo.Seats;
            PricePerDay = carInfo.PricePerDay;
            Year = carInfo.Year;
            Type = carInfo.Type;
            PickupLocation = carInfo.PickupLocation;
            DropoffLocation = carInfo.DropoffLocation;
        }
    }
}
