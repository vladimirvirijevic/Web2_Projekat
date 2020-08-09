using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebProjekat.Data;
using WebProjekat.Helpers;
using WebProjekat.Models;
using WebProjekat.Requests.Airline;
using WebProjekat.Services.Users;

namespace WebProjekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirlineController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IUserService _userService;
        private IHttpContextAccessor _httpContextAccessor;

        public AirlineController(ApplicationDbContext context, IUserService userService, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _userService = userService;
            _httpContextAccessor = httpContextAccessor;

            var user = _httpContextAccessor.HttpContext.Items["User"];
            //var user2 = (User)HttpContext.Items["User"];
            //var prinicpal = (ClaimsPrincipal)Thread.CurrentPrincipal;
            //var user = _userService.GetCurrentUser(prinicpal);

            // Seed Dummy Data
            //SeedCompanies();
        }

        [HttpPost]
        [Route("companies")]
        [Authorize]
        public async Task<ActionResult<AirplaneCompany>> AddCompany ([FromBody] CreateAirlineCompanyRequest request) 
        {
            if (request.Name == "" || request.AdminId == 0)
            {
                return BadRequest();
            }

            // Proveri da li vec postoji kompanija sa tim imenom
            bool companyExists = await _context.AirplaneCompanies.FirstOrDefaultAsync(x => x.Name == request.Name) != null;

            if (companyExists)
            {
                return Conflict();
            }

            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            // Proveri da li je user admin
            if (currentUser == null)
            {
                return BadRequest();
            }

            if (currentUser.Role != "Admin")
            {
                return BadRequest();
            }

            var airplaneCompany = new AirplaneCompany(request);
            var user = await _context.Users.FindAsync(request.AdminId);

            if (user == null)
            {
                return BadRequest();
            }

            _context.AirplaneCompanies.Add(airplaneCompany);
            user.AirlineCompanies.Add(airplaneCompany);
            user.IsCompanyAdmin = true;
            
            await _context.SaveChangesAsync();

            return Ok(airplaneCompany);
        }

        [HttpGet]
        public async Task<IEnumerable<AirplaneCompany>> GetCompanies()
        {
            return await _context.AirplaneCompanies.ToListAsync();
        }

        private void SeedCompanies()
        {
            if (_context.AirplaneCompanies.Count() == 0)
            {
                AirplaneCompany company1 = new AirplaneCompany
                {
                    Name = "Air Serbia",
                    Address = "Belgrade Nikola Tesla Airport",
                    Description = "Best Airplane Company in Serbia",
                    Grade = 9,
                    Destinations = new List<Location>
                    {
                        new Location { Name = "Serbia", Lat = 12, Long = 13 },
                        new Location { Name = "Spain", Lat = 11, Long = 1 },
                        new Location { Name = "France", Lat = 10, Long = 6 }
                    }
                };

                AirplaneCompany company2 = new AirplaneCompany
                {
                    Name = "Air France",
                    Address = "Paris Airport",
                    Description = "Best Airplane Company in France",
                    Grade = 9,
                    Destinations = new List<Location>
                    {
                        new Location { Name = "Serbia", Lat = 12, Long = 13 },
                        new Location { Name = "Croatia", Lat = 11, Long = 1 },
                        new Location { Name = "Spain", Lat = 10, Long = 6 }
                    }
                };

                AirplaneCompany company3 = new AirplaneCompany
                {
                    Name = "Air Spain",
                    Address = "Madrid Airport",
                    Description = "Best Airplane Company in Spain",
                    Grade = 9,
                    Destinations = new List<Location>
                    {
                        new Location { Name = "USA", Lat = 12, Long = 13 },
                        new Location { Name = "China", Lat = 11, Long = 1 },
                        new Location { Name = "France", Lat = 10, Long = 6 }
                    }
                };

                _context.AirplaneCompanies.Add(company1);
                _context.AirplaneCompanies.Add(company2);
                _context.AirplaneCompanies.Add(company3);

                _context.SaveChanges();
            }
        }
    }
}
