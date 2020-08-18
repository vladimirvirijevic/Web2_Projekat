using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Ocsp;
using WebProjekat.Data;
using WebProjekat.Helpers;
using WebProjekat.Models;
using WebProjekat.Requests.Rentacar;
using WebProjekat.Requests.RentacarAdmin;
using WebProjekat.Services.Date;

namespace WebProjekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentacarController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IHttpContextAccessor _httpContextAccessor;
        private IDateService _dateService;

        public RentacarController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor, IDateService dateService)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _dateService = dateService;
            //SeedCompanies();
        }

        [HttpPost]
        [Route("companies")]
        [Authorize]
        public async Task<ActionResult<AirplaneCompany>> AddCompany([FromBody] CreateRentacarCompanyRequest request)
        {
            if (request.Name == "" || request.AdminId == 0)
            {
                return BadRequest();
            }

            // Proveri da li vec postoji kompanija sa tim imenom
            bool companyExists = await _context.RentacarCompanies.FirstOrDefaultAsync(x => x.Name == request.Name) != null;

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

            var rentacarCompany = new RentacarCompany(request);
            var user = await _context.Users.FindAsync(request.AdminId);

            if (user == null)
            {
                return BadRequest();
            }

            // Proveri da li je user vec admin neke kompanije
            if (user.RentacarCompany.Count > 0)
            {
                return NotFound();
            }

            _context.RentacarCompanies.Add(rentacarCompany);
            user.RentacarCompany.Add(rentacarCompany);
            user.IsCompanyAdmin = true;

            await _context.SaveChangesAsync();

            return Ok(rentacarCompany);
        }

        [HttpGet]
        public async Task<IEnumerable<RentacarCompany>> GetCompanies()
        {
            return await _context.RentacarCompanies.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RentacarCompany>> GetCompany(int id)
        {
            var company = await _context.RentacarCompanies.FindAsync(id);

            if (company == null)
            {
                return NotFound();
            }

            return company;
        }

        [HttpGet("car/{carId}")]
        public async Task<ActionResult<RentacarCompany>> GetCar(int carId)
        {
            var car = await _context.Cars.FindAsync(carId);

            if (car == null)
            {
                return NotFound();
            }

            return Ok(car);
        }

        [HttpPost("search")]
        public async Task<ActionResult<IEnumerable<RentacarCompany>>> SearchServices([FromBody] SearchRentacarServiceRequest request)
        {
            // Validacija datuma
            DateTime pickupDate = DateTime.ParseExact(request.PickupDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            DateTime dropoffDate = DateTime.ParseExact(request.DropoffDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

            if (pickupDate > dropoffDate)
            {
                return Conflict();
            }

            List<RentacarCompany> foundCompanies = new List<RentacarCompany>();

            if (request.Location == "" && request.Name == "")
            {
                return NotFound();
            }
            else if (request.Location == "")
            {
                foundCompanies = await _context.RentacarCompanies.Where(x => x.Name == request.Name).ToListAsync();
            }
            else if (request.Name == "")
            {
                foundCompanies = await _context.RentacarCompanies.Where(x => x.Address == request.Location).ToListAsync();
            }
            else
            {
                foundCompanies = await _context.RentacarCompanies.Where(x => x.Address == request.Location && x.Name == request.Name).ToListAsync();
            }

            // TODO: pretraga po slobodnim datumim automobila

            return Ok(foundCompanies);
        }

        [HttpPost("book")]
        [Authorize]
        public async Task<ActionResult> BookCar([FromBody] BookCarRequest request)
        {
            DateTime pickupDate = DateTime.ParseExact(request.PickupDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            DateTime dropoffDate = DateTime.ParseExact(request.DropoffDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

            if (!_dateService.ValidateDateRange(pickupDate, dropoffDate))
            {
                return Conflict();
            }

            var user = await _context.Users.FindAsync(request.UserId);
            if (user == null)
            {
                return BadRequest();
            }

            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (request.UserId != currentUser.Id)
            {
                return Unauthorized();
            }

            var car = await _context.Cars.FindAsync(request.CarId);

            if (car == null)
            {
                return BadRequest();
            }

            // TODO Proveri da li auto vec rezervisan za taj datum
            if (car.CarReservations.Count > 0)
            {
                foreach (var reservation in car.CarReservations)
                {
                    DateTime reservationPickupDate = DateTime.ParseExact(reservation.PickupDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                    DateTime reservationDropoffDate = DateTime.ParseExact(reservation.DropoffDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

                    var dates = _dateService.DaysListBetweenDates(reservationPickupDate, reservationDropoffDate);

                    if (dates.Contains(pickupDate) || dates.Contains(dropoffDate))
                    {
                        return NotFound();
                    }
                }
            }



            var carReservation = new CarReservation(request);

            carReservation.Days = _dateService.DaysBetweenDates(pickupDate, dropoffDate);
            carReservation.TotalPrice = car.PricePerDay * carReservation.Days;
            carReservation.Status = "CONFIRMED";

            car.CarReservations.Add(carReservation);
            user.CarReservations.Add(carReservation);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}