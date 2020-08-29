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
        public DbSet<RentacarBranch> RentacarBranches { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<CarReservation> CarReservations { get; set; }
        public DbSet<BonusInfo> BonusInfo { get; set; }
        public DbSet<CarDiscount> CarDiscounts { get; set; }
        
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Seat> Seats { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
