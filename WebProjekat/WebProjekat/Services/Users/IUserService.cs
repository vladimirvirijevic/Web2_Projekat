using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using WebProjekat.Models;
using WebProjekat.Responses;

namespace WebProjekat.Services.Users
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        Task<User> CreateAsync(User user, string password, string emailLink);
        User Create(User user, string password, string emailLink);
        string GenerateToken(User user);
        User GetCurrentUser(ClaimsPrincipal principal);

        Task<bool> ChangePassword(User userInfo, string oldPassword, string newPassword);
        Task<bool> ChangeAdminPassword(User userInfo, string newPassword);
        Task<bool> ConfirmAccount(string email, string token);
        Task<bool> EditUser(User user);
        
    }
}
