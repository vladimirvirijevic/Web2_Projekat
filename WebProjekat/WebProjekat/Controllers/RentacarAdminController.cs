using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Ocsp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebProjekat.Data;
using WebProjekat.Helpers;
using WebProjekat.Models;
using WebProjekat.Requests.RentacarAdmin;

namespace WebProjekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentacarAdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IHttpContextAccessor _httpContextAccessor;

        public RentacarAdminController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
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
    }
}
