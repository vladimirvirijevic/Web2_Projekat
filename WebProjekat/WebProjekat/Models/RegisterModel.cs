﻿using System.ComponentModel.DataAnnotations;

namespace WebProjekat.Models
{
    public class RegisterModel
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string City { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
