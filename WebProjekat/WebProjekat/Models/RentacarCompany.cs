using System.Collections.Generic;

namespace WebProjekat.Models
{
    public class RentacarCompany
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public int Grade { get; set; }
        public virtual List<Car> Cars { get; set; }
    }
}
