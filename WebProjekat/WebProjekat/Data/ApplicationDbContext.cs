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
        public DbSet<Location> Locations { get; set; }
        public DbSet<RentacarCompany> RentacarCompanies { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
