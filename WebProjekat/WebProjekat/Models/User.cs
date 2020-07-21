using System.Collections.Generic;

namespace WebProjekat.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public bool Confirmed { get; set; }
        public string ConfirmationToken { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public virtual List<AirplaneCompany> AirlineCompanies { get; set; } = new List<AirplaneCompany>();
    }
}