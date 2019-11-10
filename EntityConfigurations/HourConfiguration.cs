using dutyChart.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dutyChart.EntityConfigurations
{
    public class HourConfiguration : IEntityTypeConfiguration<Hour>
    {
        public void Configure(EntityTypeBuilder<Hour> builder)
        {
            builder.ToTable(nameof(Hour)).HasKey(t => t.Id);
            builder.HasMany(Hour.SlotsProperty)
                .WithOne()
                .HasForeignKey(fk => fk.HourId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Ignore(t => t.Slots);
        }
    }
}
