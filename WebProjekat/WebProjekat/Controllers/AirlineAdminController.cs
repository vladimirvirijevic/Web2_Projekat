using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebProjekat.Data;
using WebProjekat.Helpers;
using WebProjekat.Models;
using WebProjekat.Requests.AirlineAdmin;

namespace WebProjekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirlineAdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IHttpContextAccessor _httpContextAccessor;

        public AirlineAdminController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }
        //editovanje kompanije
        [HttpPut("editCompany/{companyId}")]
        [Authorize]
        public async Task<IActionResult> EditCompany(int companyId, [FromBody] EditAirlineCompanyRequest request)
        {
            if (request.Name == "" || request.Description == "" || request.Address == "")
            {
                return BadRequest();
            }

            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (currentUser == null)
            {
                return BadRequest();
            }

            var company = await _context.AirplaneCompanies.FirstOrDefaultAsync(x => x.Id == companyId);

            if (company.Admin.Id != currentUser.Id)
            {
                return Unauthorized();
            }

            var companyExists = await _context.RentacarCompanies.FirstOrDefaultAsync(x => x.Name == request.Name);

            if (companyExists != null && company.Name != request.Name)
            {
                return Conflict();
            }

            company.Name = request.Name;
            company.Address = request.Address;
            company.Description = request.Description;

            await _context.SaveChangesAsync();

            return Ok();
        }

        //dobavlja sve lokacije sa nekim id-ijem kompanije
        [HttpGet("getLocations/{companyId}")]
        [Authorize]
        public async Task<IEnumerable<Location>> GetLocations(int companyId)
        {
           
            return  await _context.Locations.Where(x => x.Comapny.Id == companyId).ToListAsync();
            
        }

        //dodavanje lokacije
        [HttpPost("addLocation/{companyId}")]
        [Authorize]
        public async Task<IActionResult> AddLocation(int companyId, [FromBody] AddLocationRequest request)
        {
            if (request.Address == "")
            {
                return BadRequest();
            }

            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (currentUser == null)
            {
                return BadRequest();
            }

            //TODO: jedna kompanija ne sme da ima vise istih lokacija
            bool locationExists = await _context.Locations.FirstOrDefaultAsync(x => x.Name == request.Address)!=null;

            if (locationExists)
            {
                return Conflict();
            }
            
            var company = await _context.AirplaneCompanies.FirstOrDefaultAsync(x => x.Id == companyId);
            
            if (company.Admin.Id != currentUser.Id)
            {
                return Unauthorized();
            }

            var location = new Location();
            location.Name = request.Address;
            location.Comapny = new AirplaneCompany();
            location.Comapny = company;

            _context.Locations.Add(location);
            company.Destinations.Add(location);

            await _context.SaveChangesAsync();

            return Ok();

        }

        //brisanje lokacije
        [HttpDelete("deleteLocation/{locationId}")]
        [Authorize]
        public async Task<IActionResult> DeleteLocation(int locationId)
        {
            if (locationId == 0)
            {
                return BadRequest();
            }

            var location = await _context.Locations.FindAsync(locationId);
            if (location == null)
            {
                return NotFound();
            }

            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (location.Comapny.Admin.Id!= currentUser.Id)
            {
                return Unauthorized();
            }

            _context.Locations.Remove(location);
            await _context.SaveChangesAsync();

            return Ok();


        }

        //dodavanje letova
        [HttpPost("addFlight/{companyId}")]
        [Authorize]
        public async Task<IActionResult> AddFlight(int companyId, [FromBody] AddFlightRequest request)
        {
            if (request.LocationFrom == "" 
                || request.LocationTo==""
                || request.DateOfTakingOff==""
                || request.TimeOfTakingOff==""
                || request.DateOfLanding==""
                || request.TimeOfLanding==""
                || request.DurationOfFlight==""
                || request.DistanceOfFlight==""
                || request.PriceOfTicketOfFlight==""
                )
            {
                return BadRequest();
            }

            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (currentUser == null)
            {
                return BadRequest();
            }

            
            var company = await _context.AirplaneCompanies.FirstOrDefaultAsync(x => x.Id == companyId);

            if (company.Admin.Id != currentUser.Id)
            {
                return Unauthorized();
            }

            var flight = new Flight();
            flight.LocationFrom = request.LocationFrom;
            flight.LocationTo = request.LocationTo;
            flight.DateOfTakingOff = request.DateOfTakingOff;
            flight.TimeOfTakingOff = request.TimeOfTakingOff;
            flight.DateOfLanding = request.DateOfLanding;
            flight.TimeOfLanding = request.TimeOfLanding;
            flight.DurationOfFlight = request.DurationOfFlight;
            flight.DistanceOfFlight = request.DistanceOfFlight;
            flight.NumberOfTransfers = request.NumberOfTransfers;
            flight.LocationOfTransfers = request.LocationOfTransfers;
            flight.PriceOfTicketOfFlight = request.PriceOfTicketOfFlight;
            flight.Company = new AirplaneCompany();
            flight.Company = company;

            _context.Flights.Add(flight);
            company.Flights.Add(flight);

            await _context.SaveChangesAsync();

            return Ok();

        }


        //dobavlja letove
        [HttpGet("getFlights/{companyId}")]
        [Authorize]
        public async Task<IEnumerable<Flight>> GetFlights(int companyId)
        {

            return await _context.Flights.Where(x => x.Company.Id == companyId).ToListAsync();
        }

        //brisanje letova
        [HttpDelete("deleteFlight/{flightId}")]
        [Authorize]
        public async Task<IActionResult> DeleteFlight(int flightId)
        {
            if (flightId == 0)
            {
                return BadRequest();
            }

            var flight = await _context.Flights.FindAsync(flightId);
            if (flight== null)
            {
                return NotFound();
            }

            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (flight.Company.Admin.Id != currentUser.Id)
            {
                return Unauthorized();
            }

            _context.Flights.Remove(flight);
            await _context.SaveChangesAsync();

            return Ok();


        }


        //kreiranje sedista
        [HttpPost("createSeat/{flightId}")]
        [Authorize]
        public async Task<IActionResult> CreateSeat(int flightId, [FromBody] CreateSeatRequest request)
        {
            if (request.NumberOfSeat == 0)
            {
                return BadRequest();
            }

            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (currentUser == null)
            {
                return BadRequest();
            }

            bool seatExists = await _context.Seats.FirstOrDefaultAsync(x => x.NumberOfSeat == request.NumberOfSeat && x.FlightBelonging.Id==flightId ) != null;

            if (seatExists)
            {
                return Conflict();
            }

            var flight = await _context.Flights.FirstOrDefaultAsync(x => x.Id == flightId);

            if (flight.Company.Admin.Id != currentUser.Id)
            {
                return Unauthorized();
            }

            var seat = new Seat();
            seat.NumberOfSeat = request.NumberOfSeat;
            seat.IsItReserved = false;
            seat.IsItAvailable = true;
            seat.DoesItExist = true;
            seat.WhoCreatedIt = flight.Company;
            seat.FlightBelonging = flight;

            _context.Seats.Add(seat);
            flight.Seats.Add(seat);

            await _context.SaveChangesAsync();

            return Ok();

        }


        //dobavljanje svih sedista iz jednog leta
        [HttpGet("getSeats/{flightId}")]
        [Authorize]
        public async Task<IEnumerable<Seat>> GetSeats(int flightId)
        {

            return await _context.Seats.Where(x => x.FlightBelonging.Id == flightId).ToListAsync();

        }


        //brisanje sedista
        [HttpDelete("deleteSeat/{seatId}")]
        [Authorize]
        public async Task<IActionResult> DeleteSeat(int seatId)
        {
            if (seatId == 0)
            {
                return BadRequest();
            }

            var seat = await _context.Seats.FindAsync(seatId);
            if (seat == null)
            {
                return NotFound();
            }

            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (seat.WhoCreatedIt.Admin.Id != currentUser.Id)
            {
                return Unauthorized();
            }

            if(seat.IsItReserved)
            {
                return BadRequest();
            }
            _context.Seats.Remove(seat);
            await _context.SaveChangesAsync();

            return Ok();

        }

        //editovanje sedista
        [HttpPut("editSeat/{flightId}")]
        [Authorize]
        public async Task<IActionResult> EditFlight(int flightId, [FromBody] EditSeatRequest request)
        {
            if (request.NumberOfSeat==0)
            {
                return BadRequest();
            }

            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (currentUser == null)
            {
                return BadRequest();
            }

            var flight = await _context.Flights.FirstOrDefaultAsync(x => x.Id == flightId);

            if (flight.Company.Admin.Id != currentUser.Id)
            {
                return Unauthorized();
            }

            var seat = await _context.Seats.FirstOrDefaultAsync(x => x.NumberOfSeat == request.NumberOfSeat && x.FlightBelonging.Id == flightId);

            if(seat==null)
            {
                return BadRequest();
            }
            
            if(seat.IsItReserved)
            {
                return BadRequest();
            }

            seat.IsItAvailable = request.IsItAvailable;
            seat.DoesItExist = request.DoesItExist;

            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}
