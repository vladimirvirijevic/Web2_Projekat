using System.Collections.Generic;
using WebProjekat.Requests.RentacarAdmin;

namespace WebProjekat.Models
{
    public class RentacarCompany
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public int Grade { get; set; }
        public virtual List<RentacarBranch> Branches { get; set; } = new List<RentacarBranch>();
        public virtual User Admin { get; set; }

        public RentacarCompany() { }

        public RentacarCompany(CreateRentacarCompanyRequest companyInfo)
        {
            Name = companyInfo.Name;
        }
    }
}
