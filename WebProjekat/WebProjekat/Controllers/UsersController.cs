using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WebProjekat.Services.Users;
using WebProjekat.Models;
using WebProjekat.Helpers;
using WebProjekat.Services.Email;

namespace WebProjekat.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {
            if (model.Username == "" || model.Password == "")
            {
                return BadRequest("You must enter all fields");
            }

            var user = _userService.Authenticate(model.Username, model.Password);

            if (user == null)
                return BadRequest();

            string tokenString = _userService.GenerateToken(user);

            return Ok(new
            {
                Id = user.Id,
                Email = user.Email,
                City = user.City,
                Phone = user.Phone,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
                Token = tokenString
            });
        }

        [AllowAnonymous]
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
                Confirmed = false,
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

        [AllowAnonymous]
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