using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using WebProjekat.Data;
using WebProjekat.Helpers;
using WebProjekat.Models;
using WebProjekat.Requests.CarReservation;
using WebProjekat.Services.Date;

namespace WebProjekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarReservationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IHttpContextAccessor _httpContextAccessor;
        private IDateService _dateService;

        public CarReservationController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor, IDateService dateService)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _dateService = dateService;
        }

        [Authorize]
        [HttpGet]
        [Route("company/{adminId}")]
        public async Task<ActionResult<List<CarReservation>>> GetAdminReservations(int adminId)
        {
            if (adminId == 0)
            {
                return BadRequest();
            }

            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (adminId != currentUser.Id)
            {
                return Unauthorized();
            }

            if (currentUser.Role != "RentacarAdmin")
            {
                return Unauthorized();
            }

            var reservations = await _context.CarReservations.Where(r => r.Car.Branch.Company.Admin.Id == adminId).ToListAsync();

            return Ok(reservations);
        }

        [Authorize]
        [HttpPut]
        [Route("finish/{reservationId}")]
        public async Task<IActionResult> FinishReservations(int reservationId, [FromBody] FinishCarReservation request)
        {
            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            var reservation = await _context.CarReservations.FindAsync(reservationId);

            if (reservation.Car.Branch.Company.Admin.Id != currentUser.Id)
            {
                return Unauthorized();
            }

            DateTime dropoffDate = DateTime.ParseExact(reservation.DropoffDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

            DateTime today = DateTime.Today;

            if (dropoffDate > today)
            {
                return Conflict();
            }

            // dodeli poene korisniku
            var user = await _context.Users.FindAsync(reservation.User.Id);
            var bonusPoints = await _context.BonusInfo.FirstOrDefaultAsync();

            if (bonusPoints == null || user == null)
            {
                return BadRequest();
            }

            user.BonusPoints += bonusPoints.RentacarBonus;

            reservation.Status = "FINISHED";

            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize]
        [HttpGet]
        [Route("reservations")]
        public async Task<ActionResult<List<CarReservation>>> GetUserCarReservations()
        {
            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (currentUser.Role != "User")
            {
                return Unauthorized();

            }

            var reservations = await _context.CarReservations.Where(x => x.User.Id == currentUser.Id).ToListAsync();

            return Ok(reservations);
        }

        [Authorize]
        [HttpGet]
        [Route("reservations/{reservationId}")]
        public async Task<ActionResult<CarReservation>> GetReservation(int reservationId)
        {
            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (currentUser.Role != "User")
            {
                return Unauthorized();

            }

            var reservation = await _context.CarReservations.FindAsync(reservationId);

            if (currentUser.Id != reservation.User.Id)
            {
                return Unauthorized();
            }

            return Ok(reservation);
        }

        [Authorize]
        [HttpPost]
        [Route("reservation/rentacar/gradecar")]
        public async Task<IActionResult> GradeCar([FromBody] GradeCarRequest request)
        {
            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            var reservation = await _context.CarReservations.FindAsync(request.ReservationId);

            if (reservation.User.Id != currentUser.Id)
            {
                return Unauthorized();
            }

            // Proveri da li je korisnik vec ocenio kola

            var grade = await _context.GradeCars.Where(g => g.Car.Id == reservation.Car.Id && g.Users.Id == reservation.User.Id).FirstOrDefaultAsync();

            if (grade != null)
            {
                grade.Grade = request.Grade;
            }
            else
            {
                var newGrade = new GradeCar(request);

                newGrade.Car = reservation.Car;
                newGrade.Users = reservation.User;

                _context.GradeCars.Add(newGrade);
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize]
        [HttpPost]
        [Route("reservation/rentacar/gradecompany")]
        public async Task<IActionResult> GradeCompany([FromBody] GradeRentacarRequest request)
        {
            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            var reservation = await _context.CarReservations.FindAsync(request.ReservationId);

            if (reservation.User.Id != currentUser.Id)
            {
                return Unauthorized();
            }

            // Proveri da li je korisnik vec ocenio kompaniju

            var grade = await _context.RentacarGrades.Where(g => g.Company.Id == reservation.Car.Branch.Company.Id && g.User.Id == reservation.User.Id).FirstOrDefaultAsync();

            if (grade != null)
            {
                grade.Grade = request.Grade;
            }
            else
            {
                var newGrade = new RentacarGrade(request);

                newGrade.Company = reservation.Car.Branch.Company;
                newGrade.User = reservation.User;

                _context.RentacarGrades.Add(newGrade);
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("car/grade/{carid}")]
        public async Task<ActionResult> GetCarGrade(int carId)
        {
            var grades = await _context.GradeCars.Where(x => x.Car.Id == carId).ToListAsync();

            double total = 0;

            grades.ForEach(grade =>
            {
                total += grade.Grade;
            });

            var carGrade = total / grades.Count();

            return Ok(carGrade);
        }

        [Authorize]
        [HttpDelete]
        [Route("delete/{reservationId}")]
        public async Task<IActionResult> DeleteReservation(int reservationId)
        {
            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            var reservation = await _context.CarReservations.FindAsync(reservationId);

            if (reservation == null)
            {
                return BadRequest();
            }

            if (reservation.User.Id != currentUser.Id)
            {
                return Unauthorized();
            }

            var currentDate = DateTime.ParseExact(DateTime.Now.ToString("yyyy-MM-dd"), "yyyy-MM-dd", CultureInfo.InvariantCulture);
            var pickupDate = DateTime.ParseExact(reservation.PickupDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

            var cancelDeadline = pickupDate.AddDays(-2);

            if (currentDate > cancelDeadline)
            {
                return Conflict();
            }

            _context.CarReservations.Remove(reservation);

            await _context.SaveChangesAsync();

            return Ok();
        }

        
    }
}
