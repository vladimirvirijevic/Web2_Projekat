using System.Collections.Generic;
using WebProjekat.Requests.RentacarAdmin;

namespace WebProjekat.Models
{
    public class RentacarBranch
    {
        public int Id { get; set; }
        public string Address { get; set; }

        public virtual RentacarCompany Company { get; set; }
        public virtual List<Car> Cars { get; set; } = new List<Car>();

        public RentacarBranch() { }

        public RentacarBranch(CreateBranchRequest RentacarBranch)
        {
            Address = RentacarBranch.Address;
        }
    }
}
