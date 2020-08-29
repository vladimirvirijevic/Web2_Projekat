using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Ocsp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebProjekat.Data;
using WebProjekat.Helpers;
using WebProjekat.Models;
using WebProjekat.Requests.Admin;
using WebProjekat.Services.Users;

namespace WebProjekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IUserService _userService;
        private IHttpContextAccessor _httpContextAccessor;

        public AdminController(ApplicationDbContext context, IUserService userService, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _userService = userService;
            _httpContextAccessor = httpContextAccessor;
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

        [HttpGet]
        [Route("mycompany/{userId}")]
        [Authorize]
        public ActionResult<AirplaneCompany> GetMyCompany([FromRoute] int userId)
        {
            if (userId == 0)
            {
                return BadRequest();
            }

            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (currentUser == null)
            {
                return BadRequest();
            }

            if (userId != currentUser.Id)
            {
                return BadRequest();
            }

            if (currentUser.Role == "AirlineAdmin" && currentUser.AirlineCompanies.Count > 0)
            {
                return Ok(currentUser.AirlineCompanies[0]);
            } 
            else if (currentUser.Role == "RentacarAdmin" && currentUser.RentacarCompany.Count > 0)
            {
                return Ok(currentUser.RentacarCompany[0]);
            }

            return NotFound();
        }

        [HttpGet]
        [Route("bonus")]
        [Authorize]
        public async Task<ActionResult<BonusInfo>> GetBonusInfo()
        {
            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (currentUser.Role != "Admin")
            {
                return Unauthorized();
            }

            var bonusInfo = await _context.BonusInfo.FirstOrDefaultAsync();

            return Ok(bonusInfo);
        }

        [Authorize]
        [HttpPost]
        [Route("bonus")]
        public async Task<ActionResult> ChangeBonusInfo([FromBody] ChangeBonusInfoRequest request)
        {
            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (currentUser.Role != "Admin")
            {
                return Unauthorized();
            }

            if (_context.BonusInfo.Count() > 0)
            {
                var bonusInfo = await _context.BonusInfo.FirstAsync();

                bonusInfo.FlightBonus = request.FlightBonus;
                bonusInfo.RentacarBonus = request.RentacarBonus;

                await _context.SaveChangesAsync();
            }
            else
            {
                BonusInfo newBonusInfo = new BonusInfo(request);

                _context.BonusInfo.Add(newBonusInfo);

                await _context.SaveChangesAsync();
            }

            return Ok();
        }
    }
}
