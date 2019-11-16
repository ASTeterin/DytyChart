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
            builder.Property(Worker.UnwantedSlotsJsonProperty).HasColumnName("UnwantedSlotsJson");
            builder.Ignore(t => t.UnwantedSlots);
        }
    }
}
