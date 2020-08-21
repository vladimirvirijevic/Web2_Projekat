using System.ComponentModel.DataAnnotations;

namespace WebProjekat.Requests.CarReservation
{
    public class FinishCarReservation
    {
        [Required]
        public string Status { get; set; }
    }
}
