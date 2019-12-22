using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dutyChart.EntityConfigurations
{
    public class WorkerConfiguration : IEntityTypeConfiguration<Worker>
    {
        public void Configure(EntityTypeBuilder<Worker> builder)
        {
            builder.ToTable(nameof(Worker)).HasKey(t => t.Id);
            builder.HasMany(Worker.AbsentPeriodsProperty)
                .WithOne()
                .HasForeignKey(fk => fk.WorkerId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Property(Worker.UnwantedSlotsJsonProperty).HasColumnName("UnwantedSlotsJson");
            builder.Property(Worker.DesirableSlotsJsonProperty).HasColumnName("DesirableSlotsJson");
            builder.Ignore(t => t.AbsentPeriods);
            builder.Ignore(t => t.UnwantedSlots);
            builder.Ignore(t => t.DesirableSlots);
        }
    }
}
