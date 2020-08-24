using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Ocsp;
using WebProjekat.Data;
using WebProjekat.Helpers;
using WebProjekat.Models;
using WebProjekat.Requests.Airline;
using WebProjekat.Requests.AirlineAdmin;
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

            // Proveri da li je user vec admin neke kompanije
            if (user.AirlineCompanies.Count > 0)
            {
                return NotFound();
            }

            _context.AirplaneCompanies.Add(airplaneCompany);
            user.AirlineCompanies.Add(airplaneCompany);
            user.IsCompanyAdmin = true;
            
            await _context.SaveChangesAsync();

            return Ok(airplaneCompany);
        }

        [HttpGet("getCompanies")]
        public async Task<IEnumerable<AirplaneCompany>> GetCompanies()
        {
            return await _context.AirplaneCompanies.ToListAsync();
        }

        [HttpGet("companies/{companyId}")]
        public async Task<ActionResult<AirplaneCompany>> GetCompany(int companyId)
        {
            var result = await _context.AirplaneCompanies.FindAsync(companyId);

            return Ok(result);
        }

        [HttpGet("flights")]
        public async Task<IEnumerable<Flight>> GetFlights()
        {
            return await _context.Flights.ToListAsync();
        }

        [HttpPost("searchcompanies")]
        public async Task<ActionResult<IEnumerable<AirplaneCompany>>> SearchCompanies([FromBody] SearchAirlineCompanyRequest request)
        {
            List<AirplaneCompany> companies = new List<AirplaneCompany>();

            if (request.Location == "" && request.Name == "")
            {
                companies = await _context.AirplaneCompanies.ToListAsync();
            }
            else if (request.Location == "")
            {
                companies = await _context.AirplaneCompanies.Where(x => x.Name.Contains(request.Name)).ToListAsync();
            }
            else if (request.Name == "")
            {
                companies = await _context.AirplaneCompanies.Where(x => x.Address.Contains(request.Location)).ToListAsync();
            }
            else
            {
                companies = await _context.AirplaneCompanies.Where(x => x.Address.Contains(request.Location) && x.Name.Contains(request.Name)).ToListAsync();
            }

            return Ok(companies);
        }

        [HttpPost("searchflights")]
        public async Task<ActionResult<IEnumerable<Flight>>> SearchFlights([FromBody] SearchFlightsRequest request)
        {
            List<Flight> flights = new List<Flight>();

            flights = await _context.Flights.Where(f => 
                    f.LocationFrom.Contains(request.From) && 
                    f.LocationTo.Contains(request.To) &&
                    f.DateOfTakingOff == request.TakeoffDate &&
                    f.DateOfLanding == request.LandingDate
                ).ToListAsync();

            return Ok(flights);
        }
    }
}
