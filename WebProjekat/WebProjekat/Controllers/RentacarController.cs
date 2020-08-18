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
            List<RentacarCompany> foundCompanies = new List<RentacarCompany>();
            List<RentacarCompany> companies = new List<RentacarCompany>();

            if (request.Location == "" && request.Name == "")
            {
                companies = await _context.RentacarCompanies.ToListAsync();
            }
            else if (request.Location == "")
            {
                //companies = await _context.RentacarCompanies.Where(x => x.Name == request.Name).ToListAsync();
                companies = await _context.RentacarCompanies.Where(x => x.Name.Contains(request.Name)).ToListAsync();
            }
            else if (request.Name == "")
            {
                //companies = await _context.RentacarCompanies.Where(x => x.Address == request.Location).ToListAsync();
                companies = await _context.RentacarCompanies.Where(x => x.Address.Contains(request.Location)).ToListAsync();
            }
            else
            {
                companies = await _context.RentacarCompanies.Where(x => x.Address.Contains(request.Location) && x.Name.Contains(request.Name)).ToListAsync();
            }

            if (request.PickupDate != "" && request.DropoffDate == "")
            {
                return BadRequest();
            }
            else if (request.PickupDate == "" && request.DropoffDate != "")
            {
                return BadRequest();
            }

            if (request.PickupDate != "" && request.DropoffDate != "")
            {
                // Validacija datuma
                DateTime pickupDate = DateTime.ParseExact(request.PickupDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                DateTime dropoffDate = DateTime.ParseExact(request.DropoffDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

                if (pickupDate > dropoffDate)
                {
                    return Conflict();
                }

                foreach (var company in companies)
                {
                    foreach (var branch in company.Branches)
                    {
                        foreach (var car in branch.Cars)
                        {
                            if (car.CarReservations.Count > 0)
                            {
                                foreach (var carReservation in car.CarReservations)
                                {
                                    DateTime reservationPickupDate = DateTime.ParseExact(carReservation.PickupDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                                    DateTime reservationDropoffDate = DateTime.ParseExact(carReservation.DropoffDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

                                    var dates = _dateService.DaysListBetweenDates(reservationPickupDate, reservationDropoffDate);

                                    if (dates.Contains(pickupDate) || dates.Contains(dropoffDate))
                                    {
                                        continue;
                                    }
                                    else
                                    {
                                        if (!foundCompanies.Contains(company))
                                        {
                                            foundCompanies.Add(company);
                                        }
                                    }
                                }
                            }
                            else
                            {
                                if (!foundCompanies.Contains(company))
                                {
                                    foundCompanies.Add(company);
                                }
                            }
                        }
                    }
                }

                return Ok(foundCompanies);
            }
            else
            {
                return Ok(companies);
            }
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

        [HttpPost("searchcars")]
        public async Task<ActionResult<Car>> SearchCars([FromBody] SearchCarsRequest request)
        {
            var company = await _context.RentacarCompanies.FindAsync(request.CompanyId);

            if (company == null)
            {
                return BadRequest();
            }

            DateTime pickupDate = DateTime.ParseExact(request.PickupDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            DateTime dropoffDate = DateTime.ParseExact(request.DropoffDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

            if (!_dateService.ValidateDateRange(pickupDate, dropoffDate))
            {
                return Conflict();
            }

            List<Car> foundCars = new List<Car>();

            foreach (var branch in company.Branches)
            {
                foreach (var car in branch.Cars)
                {
                    if (car.DropoffLocation.Contains(request.DropoffLocation) && car.PickupLocation.Contains(request.PickupLocation) && car.Seats >= request.Seats)
                    {
                        if (request.Type != "Any")
                        {
                            if (!car.Type.Contains(request.Type))
                            {
                                continue;
                            }
                        }

                        if (car.CarReservations.Count > 0)
                        {
                            // Proveri datume
                            foreach (var reservation in car.CarReservations)
                            {
                                DateTime reservationPickupDate = DateTime.ParseExact(reservation.PickupDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                                DateTime reservationDropoffDate = DateTime.ParseExact(reservation.DropoffDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

                                var dates = _dateService.DaysListBetweenDates(reservationPickupDate, reservationDropoffDate);

                                if (dates.Contains(pickupDate) || dates.Contains(dropoffDate))
                                {
                                    continue;
                                }
                                else
                                {
                                    if (!foundCars.Contains(car))
                                    {
                                        foundCars.Add(car);
                                    }
                                }
                            }
                        }
                        else
                        {
                            if (!foundCars.Contains(car))
                            {
                                foundCars.Add(car);
                            }
                        }
                    }
                }
            }

            return Ok(foundCars);
        }

        [HttpGet("{companyId}/cars")]
        public async Task<ActionResult<List<Car>>> GetCars(int companyId)
        {
            var cars = new List<Car>();

            var company = await _context.RentacarCompanies.FindAsync(companyId);

            if (company == null)
            {
                return BadRequest();
            }

            company.Branches.ForEach(branch =>
            {
                branch.Cars.ForEach(car => {
                    cars.Add(car);
                });
            });

            return Ok(cars);
        }
    }
}