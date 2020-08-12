namespace WebProjekat.Models
{
    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Lat { get; set; }
        public double Long { get; set; }

        public virtual AirplaneCompany CompanyTest { get; set; }
    }
}
