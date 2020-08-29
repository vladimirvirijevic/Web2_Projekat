
using System.ComponentModel.DataAnnotations;

namespace WebProjekat.Requests.RentacarAdmin
{
    public class AddDiscountRequest
    {
        [Required]
        public int CarId { get; set; }
        [Required]
        public string StartDate { get; set; }
        [Required]
        public string EndDate { get; set; }
        [Required]
        public double Percent { get; set; }
    }
}
