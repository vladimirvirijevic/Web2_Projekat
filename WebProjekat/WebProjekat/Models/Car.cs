namespace WebProjekat.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int Doors { get; set; }
        public int Year { get; set; }
        public string EngineType{ get; set; }
        public double Capacity { get; set; }
        public virtual RentacarCompany Company { get; set; }
    }
}
