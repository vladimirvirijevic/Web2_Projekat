using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Ocsp;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using WebProjekat.Data;
using WebProjekat.Helpers;
using WebProjekat.Models;
using WebProjekat.Requests.RentacarAdmin;
using WebProjekat.Responses.RentacarAdmin;
using WebProjekat.Services.Date;

namespace WebProjekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentacarAdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IHttpContextAccessor _httpContextAccessor;
        private IDateService _dateService;

        public RentacarAdminController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor, IDateService dateService)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _dateService = dateService;
        }

        [HttpPut]
        [Authorize]
        [Route("editcompany/{companyId}")]
        public async Task<IActionResult> EditRentacarCompany(int companyId, [FromBody] EditRentacarCompanyRequest request)
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

            var company = await _context.RentacarCompanies.FirstOrDefaultAsync(x => x.Id == companyId);

            if (company.Admin.Id != currentUser.Id)
            {
                return Unauthorized();
            }

            // Proveri da li vec postoji kompanija sa istim imenom
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

        [HttpGet]
        [Route("branches/{companyId}")]
        [Authorize]
        public async Task<ActionResult<List<User>>> GetBranches(int companyId)
        {
            var branches = await _context.RentacarBranches.Where(x => x.Company.Id == companyId).ToListAsync();
            
            return Ok(branches);
        }

        [HttpPost]
        [Authorize]
        [Route("branch")]
        public async Task<IActionResult> CreateBranch([FromBody] CreateBranchRequest request) 
        {
            if (request.Address == "" || request.CompanyId == 0)
            {
                return BadRequest();
            }

            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (currentUser == null)
            {
                return BadRequest();
            }

            bool branchExists = await _context.RentacarBranches.FirstOrDefaultAsync(x => x.Address == request.Address) != null;

            if (branchExists)
            {
                return Conflict();
            }

            var company = await _context.RentacarCompanies.FirstOrDefaultAsync(x => x.Id == request.CompanyId);

            if (company.Admin.Id != currentUser.Id)
            {
                return Unauthorized();
            }

            var branch = new RentacarBranch(request);

            company.Branches.Add(branch);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        [Authorize]
        [Route("car")]
        public async Task<IActionResult> CreateCar([FromBody] CreateCarRequest request)
        {
            bool branchExists = await _context.RentacarBranches.FirstOrDefaultAsync(x => x.Id == request.BranchId) != null;

            if (!branchExists)
            {
                return BadRequest();
            }

            var branch = await _context.RentacarBranches.FirstOrDefaultAsync(x => x.Id == request.BranchId);

            var car = new Car(request);

            branch.Cars.Add(car);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [Authorize]
        [Route("car/{carId}")]
        public async Task<ActionResult<Car>> DeleteCar(int carId)
        {
            if (carId == 0)
            {
                return BadRequest();
            }

            var car = await _context.Cars.FindAsync(carId);
            if (car == null)
            {
                return NotFound();
            }

            // Proveri da li auto pripada kompaniji ulogovanog admina
            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (car.Branch.Company.Admin.Id != currentUser.Id)
            {
                return Unauthorized();
            }

            // Proveri da li auto ima rezervacija
            if (car.CarReservations.Count > 0)
            {
                return Conflict();
            }

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return car;
        }

        [HttpDelete]
        [Authorize]
        [Route("branch/{branchId}")]
        public async Task<ActionResult<Car>> DeleteBranch(int branchId)
        {
            if (branchId == 0)
            {
                return BadRequest();
            }

            var branch = await _context.RentacarBranches.FindAsync(branchId);
            if (branch == null)
            {
                return NotFound();
            }

            // Proveri da li auto pripada kompaniji ulogovanog admina
            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (branch.Company.Admin.Id != currentUser.Id)
            {
                return Unauthorized();
            }

            // Proveri da li Branch ima automobile, jer ako ima prvo se oni moraju izbrisati
            if (branch.Cars.Count > 0)
            {
                return Conflict();
            }

            _context.RentacarBranches.Remove(branch);
            await _context.SaveChangesAsync();

            return Ok(branch);
        }


        [HttpPut]
        [Authorize]
        [Route("car/{carId}")]
        public IActionResult EditCar(int carId, [FromBody] EditCarRequest request)
        {
            if (carId == 0)
            {
                return BadRequest();
            }

            var car = _context.Cars.Find(carId);

            if (car == null)
            {
                return NotFound();
            }

            // Proveri da li auto pripada kompaniji ulogovanog admina
            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (car.Branch.Company.Admin.Id != currentUser.Id)
            {
                return Unauthorized();
            }

            // Proveri da li auto ima rezervacija
            if (car.CarReservations.Count > 0)
            {
                return Conflict();
            }

            car.Brand = request.Brand;
            car.Model = request.Model;
            car.Year = request.Year;
            car.Seats = request.Seats;
            car.Type = request.Type;
            car.PricePerDay = request.PricePerDay;
            car.PickupLocation = request.PickupLocation;
            car.DropoffLocation = request.DropoffLocation;

            _context.Entry(car).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Authorize]
        [Route("branch/{branchId}")]
        public async Task<IActionResult> EditBranch(int branchId, [FromBody] EditRentacarBranchRequest request)
        {
            if (branchId == 0)
            {
                return BadRequest();
            }

            var branch = await _context.RentacarBranches.FindAsync(branchId);

            if (branch == null)
            {
                return NotFound();
            }

            // Proveri da li filijala pripada kompaniji ulogovanog admina
            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (branch.Company.Admin.Id != currentUser.Id)
            {
                return Unauthorized();
            }

            branch.Address = request.Address;

            await _context.SaveChangesAsync();

            return Ok();
        }


        [Authorize]
        [HttpGet]
        [Route("dailyearnings/{day}")]
        public async Task<ActionResult<GetEarningsResponse>> GetDailyEarnings(string day)
        {
            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (currentUser.Role != "RentacarAdmin")
            {
                return Unauthorized();
            }

            DateTime dateEarnings = DateTime.ParseExact(day, "yyyy-MM-dd", CultureInfo.InvariantCulture);

            var response = new GetEarningsResponse
            {
                TotalEarning = 0
            };

            var company = await _context.RentacarCompanies.Where(c => c.Admin.Id == currentUser.Id).FirstOrDefaultAsync();

            if (company == null)
            {
                return BadRequest();
            }

            foreach (var branch in company.Branches)
            {
                foreach (var car in branch.Cars)
                {
                    foreach (var reservation in car.CarReservations)
                    {
                        DateTime reservationPickupDate = DateTime.ParseExact(reservation.PickupDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                        DateTime reservationDropoffDate = DateTime.ParseExact(reservation.DropoffDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

                        var reservedDates = _dateService.DaysListBetweenDates(reservationPickupDate, reservationDropoffDate);

                        if (reservedDates.Contains(dateEarnings))
                        {
                            response.TotalEarning += car.PricePerDay;
                            response.Reservations.Add(reservation);
                            break;
                        }
                    }
                }
            }

            return Ok(response);
        }


        [Authorize]
        [HttpGet]
        [Route("weeklyearnings/{week}")]
        public async Task<ActionResult<GetEarningsResponse>> GetWeeklyEarnings(string week)
        {
            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (currentUser.Role != "RentacarAdmin")
            {
                return Unauthorized();
            }

            // "2020-W35"
            // "2020-W02"
            int weekNumber = int.Parse(week.Split('-')[1].Remove(0, 1));
            int year = int.Parse(week.Split('-')[0]);

            var response = new GetEarningsResponse
            {
                TotalEarning = 0
            };

            var company = await _context.RentacarCompanies.Where(c => c.Admin.Id == currentUser.Id).FirstOrDefaultAsync();

            if (company == null)
            {
                return BadRequest();
            }

            foreach (var branch in company.Branches)
            {
                foreach (var car in branch.Cars)
                {
                    foreach (var reservation in car.CarReservations)
                    {
                        DateTime reservationPickupDate = DateTime.ParseExact(reservation.PickupDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                        DateTime reservationDropoffDate = DateTime.ParseExact(reservation.DropoffDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

                        List<DateTime> dates = _dateService.DaysListBetweenDates(reservationPickupDate, reservationDropoffDate);

                        foreach (var date in dates)
                        {
                            var dateWeek = _dateService.GetWeekOfYear(date);
                            var dateYear = date.Year;

                            if (dateWeek == weekNumber && dateYear == year)
                            {
                                if (!response.Reservations.Contains(reservation))
                                {
                                    response.Reservations.Add(reservation);
                                }
                                response.TotalEarning += reservation.Car.PricePerDay;
                            }
                        }
                    }
                }
            }

            return Ok(response);
        }

        [Authorize]
        [HttpGet]
        [Route("monthlyearnings/{month}")]
        public async Task<ActionResult<GetEarningsResponse>> GetMonthlyEarnings(string month)
        {
            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (currentUser.Role != "RentacarAdmin")
            {
                return Unauthorized();
            }

            // "2020-07"
            int monthNumber = int.Parse(month.Split('-')[1]);
            int year = int.Parse(month.Split('-')[0]);

            var response = new GetEarningsResponse
            {
                TotalEarning = 0
            };

            var company = await _context.RentacarCompanies.Where(c => c.Admin.Id == currentUser.Id).FirstOrDefaultAsync();

            if (company == null)
            {
                return BadRequest();
            }

            foreach (var branch in company.Branches)
            {
                foreach (var car in branch.Cars)
                {
                    foreach (var reservation in car.CarReservations)
                    {
                        DateTime reservationPickupDate = DateTime.ParseExact(reservation.PickupDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                        DateTime reservationDropoffDate = DateTime.ParseExact(reservation.DropoffDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

                        List<DateTime> dates = _dateService.DaysListBetweenDates(reservationPickupDate, reservationDropoffDate);

                        foreach (var date in dates)
                        {
                            if (date.Year == year && date.Month == monthNumber)
                            {
                                if (!response.Reservations.Contains(reservation))
                                {
                                    response.Reservations.Add(reservation);
                                }

                                response.TotalEarning += reservation.Car.PricePerDay;
                            }
                        }
                    }
                }
            }

            return Ok(response);
        }

        [Authorize]
        [HttpGet]
        [Route("weeklystats/{week}")]
        public async Task<ActionResult<Stats>> GetWeeklyStats(string week)
        {
            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (currentUser.Role != "RentacarAdmin")
            {
                return Unauthorized();
            }

            // "2020-W35"
            // "2020-W02"
            int weekNumber = int.Parse(week.Split('-')[1].Remove(0, 1));
            int year = int.Parse(week.Split('-')[0]);

            var company = await _context.RentacarCompanies.Where(c => c.Admin.Id == currentUser.Id).FirstOrDefaultAsync();

            if (company == null)
            {
                return BadRequest();
            }

            List<DateTime> daysOfWeek = _dateService.GetDaysOfWeek(year, weekNumber);
            Dictionary<DateTime, int> daysDict = new Dictionary<DateTime, int>();

            foreach (var day in daysOfWeek)
            {
                daysDict[day] = 0;
            }

            
            foreach (var branch in company.Branches)
            {
                foreach (var car in branch.Cars)
                {
                    foreach (var reservation in car.CarReservations)
                    {
                        DateTime reservationPickupDate = DateTime.ParseExact(reservation.PickupDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                        DateTime reservationDropoffDate = DateTime.ParseExact(reservation.DropoffDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

                        List<DateTime> dates = _dateService.DaysListBetweenDates(reservationPickupDate, reservationDropoffDate);

                        foreach (var date in dates)
                        {
                            if (daysOfWeek.Contains(date))
                            {
                                daysDict[date] += 1;
                            }
                        }
                    }
                }
            }

            var response = new Stats();
            int i = 0;

            foreach (KeyValuePair<DateTime, int> kvp in daysDict)
            {
                response.Dates.Add(kvp.Key.ToString("yyyy-MM-dd"));
                response.ReservationsCount.Add(kvp.Value);

                i++;
            }

            return Ok(response);
        }
    }
}

