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
            if (request.Type == "" || request.Brand == "" || request.Model == "" || request.Seats == 0 || request.Year == 0)
            {
                return BadRequest();
            }

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

    }
}
