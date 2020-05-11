using Microsoft.EntityFrameworkCore;
using WebProjekat.Models;

namespace WebProjekat.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<AirplaneCompany> AirplaneCompanies { get; set; }
    }
}
