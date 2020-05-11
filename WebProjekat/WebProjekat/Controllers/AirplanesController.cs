using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebProjekat.Data;
using WebProjekat.Models;

namespace WebProjekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirplanesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AirplanesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("AddCompany")]
        public async Task<ActionResult<AirplaneCompany>> AddCompany (AirplaneCompany company) 
        {
            _context.AirplaneCompanies.Add(company);

            await _context.SaveChangesAsync();

            return company;
        }
    }
}
