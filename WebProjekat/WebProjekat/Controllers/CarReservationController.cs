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

            reservation.Status = "FINISHED";

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
