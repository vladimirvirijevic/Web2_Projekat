using System.ComponentModel.DataAnnotations;

namespace WebProjekat.Requests.RentacarAdmin
{
    public class EditRentacarBranchRequest
    {
        [Required]
        public string Address { get; set; }
    }
}
