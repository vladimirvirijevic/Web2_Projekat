using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebProjekat.Data;
using WebProjekat.Helpers;
using WebProjekat.Models;
using WebProjekat.Services.Users;

namespace WebProjekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IUserService _userService;

        public AdminController(ApplicationDbContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        [HttpGet]
        [Route("staff")]
        [Authorize]
        public async Task<ActionResult<List<User>>> GetStaff()
        {
            var staff = await _context.Users.Where(x => x.Role == "Admin" || x.Role == "AirlineAdmin" || x.Role == "RentacarAdmin").ToListAsync();

            return Ok(staff);
        }

        [HttpGet]
        [Route("staff/{role}")]
        [Authorize]
        public async Task<ActionResult<List<User>>> GetStaffByRole([FromRoute] string role)
        {
            if (role == "")
            {
                return BadRequest();
            }

            var staff = await _context.Users.Where(x => x.Role == role).ToListAsync();

            return Ok(staff);
        }

        [HttpPost]
        [Route("staff")]
        [Authorize]
        public async Task<ActionResult<User>> AddUser([FromBody] RegisterModel model)
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
                PasswordChanged = false,
                IsCompanyAdmin = false,
                Confirmed = true,
                Role = model.Role
            };

            try
            {
                var result = await _userService.CreateAsync(user, model.Password, null);

                if (result == null)
                {
                    // email postoji vec, vracamo 409 - Conflict
                    return Conflict();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
