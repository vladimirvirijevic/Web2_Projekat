using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebProjekat.Data;
using WebProjekat.Models;
using WebProjekat.Requests.FlightReservation;

namespace WebProjekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightReservationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IHttpContextAccessor _httpContextAccessor;

        public FlightReservationController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }

        [HttpPost("makeReservation/{flightId}")]
        public async Task<IActionResult> MakeReservation(int flightId, [FromBody] MakeReservationRequest request)
        {
            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (currentUser == null)
            {
                return BadRequest();
            }

            var flight = await _context.Flights.FirstOrDefaultAsync(x => x.Id == flightId);
           
            if(flight==null)
            {
                return BadRequest();
            }

            var seat = await _context.Seats.FirstOrDefaultAsync(x => x.NumberOfSeat == request.SeatOfReservation && x.FlightBelonging.Id == flightId);

            if (seat == null || seat.IsItAvailable==false)
            {
                return BadRequest();
            }


            FlightReservation reservation = new FlightReservation();
            
            reservation.SeatOfReservation = request.SeatOfReservation;
            
           
            if(request.FirstNameOfPersonWhoSits=="")
            {
                reservation.FirstNameOfPersonWhoSits = currentUser.FirstName;
            }
            else
            {
                reservation.FirstNameOfPersonWhoSits = request.FirstNameOfPersonWhoSits;
            }

            if (request.SecondNameOfPersonWhoSits == "")
            {
                reservation.SecondNameOfPersonWhoSits = currentUser.LastName;
            }
            else
            {
                reservation.SecondNameOfPersonWhoSits = request.SecondNameOfPersonWhoSits;
            }

            if (request.PhoneOfUserWhoSits == "")
            {
                reservation.PhoneOfUserWhoSits = currentUser.Phone;
            }
            else
            {
                reservation.PhoneOfUserWhoSits = request.PhoneOfUserWhoSits;
            }

            if (request.CityOfUserWhoSits == "")
            {
                reservation.CityOfUserWhoSits = currentUser.City;
            }
            else
            {
                reservation.CityOfUserWhoSits = request.CityOfUserWhoSits;
            }

            if (request.NumberOfPassportOfNonUser=="")
            {
                reservation.NumberOfPassport = request.NumberOfPassport;
            }
            else
            {
                reservation.NumberOfPassport = request.NumberOfPassportOfNonUser;
            }

            reservation.DateOfReservation = request.DateOfReservation;
            reservation.FlightOfReservation = new Flight();
            reservation.FlightOfReservation = flight;
            reservation.AirplaneCompanyOfReservation = new AirplaneCompany();
            reservation.AirplaneCompanyOfReservation = flight.Company;
            reservation.UserWhoReserved = new User();
            reservation.UserWhoReserved = currentUser;
            reservation.PriceOfReservation = Int32.Parse(flight.PriceOfTicketOfFlight);
            seat.IsItReserved = true;
            seat.FirstNameOfUser = reservation.FirstNameOfPersonWhoSits;
            seat.LastNameOfUser = reservation.SecondNameOfPersonWhoSits;
            

            _context.Reservations.Add(reservation);
           
            await _context.SaveChangesAsync();

            return Ok();

        }

        [HttpGet("getReservations/{userId}")]
        public async Task<IEnumerable<FlightReservation>> GetReservations(int userId)
        {

            return await _context.Reservations.Where(x => x.UserWhoReserved.Id== userId).ToListAsync();

        }


        [HttpDelete("deleteReservation/{reservationId}")]
        public async Task<IActionResult> DeleteReservation(int reservationId)
        {
            if (reservationId == 0)
            {
                return BadRequest();
            }

            var reservation = await _context.Reservations.FindAsync(reservationId);
            if (reservation == null)
            {
                return NotFound();
            }

            DateTime startDate = DateTime.Parse(reservation.DateOfReservation);
            DateTime expiryDate = startDate.AddDays(3);
            if (DateTime.Now < expiryDate)
            {
                return BadRequest();
            }
            var seat = await _context.Seats.FirstOrDefaultAsync(x => x.NumberOfSeat == reservation.SeatOfReservation && x.FlightBelonging.Id == reservation.FlightOfReservation.Id);
            if (seat == null)
            {
                return BadRequest();
            }
            else
            {
                seat.IsItReserved = false;
            }

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return Ok();

        }





    }
}