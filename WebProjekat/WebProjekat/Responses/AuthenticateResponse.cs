﻿using WebProjekat.Models;

namespace WebProjekat.Responses
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string Phone { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
        public bool PasswordChanged { get; set; }


        public AuthenticateResponse(User user, string token)
        {
            Id = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Email = user.Email;
            City = user.City;
            Phone = user.Phone;
            Role = user.Role;
            Token = token;
            PasswordChanged = user.PasswordChanged;
        }
    }
}
