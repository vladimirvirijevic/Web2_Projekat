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


    }
}
