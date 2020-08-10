using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebProjekat.Requests.RentacarAdmin
{
    public class CreateBranchRequest
    {
        public int CompanyId { get; set; }
        public string Address { get; set; }
    }
}
