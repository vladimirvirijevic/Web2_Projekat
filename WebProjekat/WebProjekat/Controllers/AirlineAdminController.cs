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


        
    }
}
