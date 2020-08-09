using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebProjekat.Data;
using WebProjekat.Helpers;
using WebProjekat.Models;
using WebProjekat.Requests.Rentacar;

namespace WebProjekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentacarController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IHttpContextAccessor _httpContextAccessor;

        public RentacarController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
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

        /*
        private void SeedCompanies()
        {
            if (_context.RentacarCompanies.Count() == 0)
            {
                Car megane1 = new Car
                {
                    Brand = "Renault",
                    Model = "Megane",
                    Year = 2002,
                    Doors = 3,
                    EngineType = "Fuel",
                    Capacity = 1390
                };

                Car insignia1 = new Car
                {
                    Brand = "Opel",
                    Model = "Insignia",
                    Year = 2013,
                    Doors = 5,
                    EngineType = "Fuel",
                    Capacity = 1598
                };

                Car insignia2 = new Car
                {
                    Brand = "Opel",
                    Model = "Insignia",
                    Year = 2008,
                    Doors = 5,
                    EngineType = "Diesel",
                    Capacity = 1598
                };

                Car megane2 = new Car
                {
                    Brand = "Renault",
                    Model = "Megane",
                    Year = 2005,
                    Doors = 3,
                    EngineType = "Fuel",
                    Capacity = 1600
                };

                Car a3 = new Car
                {
                    Brand = "Audi",
                    Model = "A3",
                    Year = 2008,
                    Doors = 3,
                    EngineType = "Fuel",
                    Capacity = 1450
                };

                RentacarCompany company1 = new RentacarCompany()
                {
                    Name = "Belgrade Rent A Car",
                    Description = "Best Rent A Car Service in Belgrade",
                    Address = "Beograd, Vojvodjanska 13",
                    Grade = 9,
                    Cars = new List<Car>
                    {
                        insignia1, a3, megane1
                    }
                };

                RentacarCompany company2 = new RentacarCompany()
                {
                    Name = "Novi Sad Rent A Car",
                    Description = "Best Rent A Car Service in Novi Sad",
                    Address = "Novi Sad, Bulervar Oslobodjenja 29",
                    Grade = 9,
                    Cars = new List<Car>
                    {
                        megane2, insignia2, megane1
                    }
                };

                _context.RentacarCompanies.Add(company1);
                _context.RentacarCompanies.Add(company2);

                _context.SaveChanges();
            }
        }
        */
    }
}