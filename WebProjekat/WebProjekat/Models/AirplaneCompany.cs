using System.Collections.Generic;
using WebProjekat.Requests.AirlineAdmin;

namespace WebProjekat.Models
{
    public class AirplaneCompany
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public int Grade { get; set; }

        public virtual List<Location> Destinations { get; set; }
        public virtual User Admin { get; set; }
        public virtual List<Flight> Flights { get; set; }

        public AirplaneCompany() { }

        public AirplaneCompany(CreateAirlineCompanyRequest companyInfo)
        {
            Name = companyInfo.Name;
        }
    }
}
