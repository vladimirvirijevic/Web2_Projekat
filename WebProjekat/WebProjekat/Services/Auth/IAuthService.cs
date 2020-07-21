using System.Collections.Generic;
using WebProjekat.Models;
using WebProjekat.Requests;
using WebProjekat.Responses;

namespace WebProjekat.Services.Auth
{
    public interface IAuthService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        IEnumerable<User> GetAll();
        User GetById(int id);
    }
}
