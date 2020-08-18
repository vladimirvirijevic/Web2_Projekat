using System.ComponentModel.DataAnnotations;

namespace WebProjekat.Requests.Rentacar
{
    public class BookCarRequest
    {
        [Required]
        public int CarId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string PickupDate { get; set; }
        [Required]
        public string DropoffDate { get; set; }
    }
}
