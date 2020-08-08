using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebProjekat.Services.Users;
using WebProjekat.Models;
using WebProjekat.Helpers;
using WebProjekat.Services.Email;
using WebProjekat.Services.Auth;
using WebProjekat.Requests;
using WebProjekat.Requests.User;

namespace WebProjekat.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IAuthService _authService;
        private IHttpContextAccessor _httpContextAccessor;

        public UsersController(IUserService userService, IAuthService authService, IHttpContextAccessor httpContextAccessor)
        {
            _userService = userService;
            _authService = authService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateRequest request)
        {
            if (request.Email == "" || request.Password == "")
            {
                return BadRequest("You must enter all fields");
            }

            //var user = _userService.Authenticate(model.Username, model.Password);
            var user = _authService.Authenticate(request);

            if (user == null)
                return BadRequest();

            //string tokenString = _userService.GenerateToken(user);

            return Ok(user);
        }

        [HttpPut("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            if (request.NewPassword == null)
            {
                return BadRequest();
            }

            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];
            var result = await _userService.ChangeAdminPassword(currentUser, request.NewPassword);

            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterModel model)
        {
            if (model.FirstName == "" || model.LastName == "" || model.Phone == "" || model.Email == "" || model.City == "")
            {
                return BadRequest();
            }

            var user = new User
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Phone = model.Phone,
                City = model.City,
                Email = model.Email,
                Confirmed = true,
                PasswordChanged = false,
                IsCompanyAdmin = false,
                Role = "User"
            };

            try
            {
                var emailLink = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
                var result = await _userService.CreateAsync(user, model.Password, emailLink);

                if (result == null)
                {
                    // email postoji vec, vracamo 409 - Conflict
                    return Conflict();
                }

                return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("activate/{email}/{token}")]
        public async Task<IActionResult> Activate([FromRoute] string email, [FromRoute] string token)
        {
            if (email == "" || token == "")
            {
                return BadRequest();
            }

            var result = await _userService.ConfirmAccount(email, token);

            if (!result)
            {
                return BadRequest();
            }
            var redirectLink = "http://localhost:4200/login";

            return Redirect(redirectLink); 
        }
    }
}