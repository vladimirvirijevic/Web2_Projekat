using System.ComponentModel.DataAnnotations;

namespace WebProjekat.Requests.CarReservation
{
    public class GradeCarRequest
    {
        [Required]
        public double Grade { get; set; }
        [Required]
        public int ReservationId { get; set; }
    }
}
