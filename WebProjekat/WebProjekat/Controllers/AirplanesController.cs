using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebProjekat.Data;
using WebProjekat.Models;

namespace WebProjekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AirplanesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AirplanesController(ApplicationDbContext context)
        {
            _context = context;

            // Seed Dummy Data
            SeedCompanies();
        }

        [HttpPost]
        [Route("AddCompany")]
        public async Task<ActionResult<AirplaneCompany>> AddCompany (AirplaneCompany company) 
        {
            _context.AirplaneCompanies.Add(company);

            await _context.SaveChangesAsync();

            return company;
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
