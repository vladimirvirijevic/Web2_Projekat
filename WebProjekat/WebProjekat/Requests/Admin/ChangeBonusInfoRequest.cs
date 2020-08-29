using System.ComponentModel.DataAnnotations;

namespace WebProjekat.Requests.Admin
{
    public class ChangeBonusInfoRequest
    {
        [Required]
        public int FlightBonus { get; set; }
        [Required]
        public int RentacarBonus { get; set; }
    }
}
