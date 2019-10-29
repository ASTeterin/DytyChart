using Microsoft.EntityFrameworkCore;


namespace dutyChart.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        { }

        public DbSet<Worker> Workers { get; set; }
    }
}
