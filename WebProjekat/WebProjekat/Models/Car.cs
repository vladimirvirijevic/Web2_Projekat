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
        public string Type{ get; set; }
        public virtual RentacarBranch Branch { get; set; }

        public Car() { }

        public Car(CreateCarRequest carInfo)
        {
            Brand = carInfo.Brand;
            Model = carInfo.Model;
            Seats = carInfo.Seats;
            Year = carInfo.Year;
            Type = carInfo.Type;
        }
    }
}
