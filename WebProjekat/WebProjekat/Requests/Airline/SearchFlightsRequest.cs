using System.ComponentModel.DataAnnotations;

namespace WebProjekat.Requests.Airline
{
    public class SearchFlightsRequest
    {
        [Required]
        public string From { get; set; }
        [Required]
        public string To { get; set; }
        [Required]
        public string TakeoffDate { get; set; }
        [Required]
        public string LandingDate { get; set; }
    }
}
