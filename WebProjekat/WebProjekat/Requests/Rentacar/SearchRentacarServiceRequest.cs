using System.ComponentModel.DataAnnotations;

namespace WebProjekat.Requests.Rentacar
{
    public class SearchRentacarServiceRequest
    {
        public string Location { get; set; }
        public string Name { get; set; }
        [Required]
        public string PickupDate { get; set; }
        [Required]
        public string DropoffDate { get; set; }
    }
}
