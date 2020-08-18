using System.ComponentModel.DataAnnotations;

namespace WebProjekat.Requests.Rentacar
{
    public class SearchCarsRequest
    {
        [Required]
        public int CompanyId { get; set; }
        [Required]
        public string PickupLocation { get; set; }
        [Required]
        public string DropoffLocation { get; set; }
        [Required]
        public string PickupDate { get; set; }
        [Required]
        public string DropoffDate { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public int Seats { get; set; }
    }
}
