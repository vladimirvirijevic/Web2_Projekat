using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebProjekat.Requests.Rentacar
{
    public class FastBookCarRequest
    {
        [Required]
        public int CarId { get; set; }
        [Required]
        public int DiscountId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string PickupDate { get; set; }
        [Required]
        public string DropoffDate { get; set; }
    }
}
