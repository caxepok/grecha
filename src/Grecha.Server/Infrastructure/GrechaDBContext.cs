using Grecha.Server.Models.DB;
using Microsoft.EntityFrameworkCore;

namespace grechaserver.Infrastructure
{
    /// <summary>
    /// Контекст БД
    /// </summary>
    public class GrechaDBContext : DbContext
    {
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Measure> Measures { get; set; }
        public DbSet<Supplier> Suppliers{ get; set; }

        public GrechaDBContext(DbContextOptions<GrechaDBContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
