using System.ComponentModel.DataAnnotations;

namespace WebProjekat.Requests.RentacarAdmin
{
    public class EditCarRequest
    {
        [Required]
        public string Brand { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public int Year { get; set; }
        [Required]
        public int Seats { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public double PricePerDay { get; set; }
        [Required]
        public string PickupLocation { get; set; }
        [Required]
        public string DropoffLocation { get; set; }
    }
}
