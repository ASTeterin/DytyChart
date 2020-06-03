using System;
using dutyChart.EntityConfigurations;
using Microsoft.EntityFrameworkCore;


namespace dutyChart.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        { }

        public DbSet<Worker> Workers { get; set; }
        public DbSet<Hour> Hours { get; set; }
        public DbSet<DefaultSlots> DefaultSlots { get; set; }
        public DbSet<Slot> Slots { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<SpecialHour> SpecialHours { get; set; }
        public DbSet<SpecialHourInDay> SpecialHoursInDay { get; set; }

        public DbSet<AbsentPeriod> AbsentPeriods { get; set; }
        public DbSet<WorkerInDay> WorkerInDays { get; set; }

        protected override void OnModelCreating( ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new WorkerConfiguration());
            modelBuilder.ApplyConfiguration(new HourConfiguration());
            modelBuilder.ApplyConfiguration(new DefaultSlotsConfiguration());
            modelBuilder.ApplyConfiguration(new SlotConfiguration());
            modelBuilder.ApplyConfiguration(new GroupConfiguration());
            modelBuilder.ApplyConfiguration(new SpecialHourConfiguration());
            modelBuilder.ApplyConfiguration(new SpecialHourInDayConfiguration());
            modelBuilder.ApplyConfiguration(new AbsentPeriodConfiguration());
            modelBuilder.ApplyConfiguration(new WorkerInDayConfiguration());
        }

        
    }
}
