using dutyChart.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dutyChart.EntityConfigurations
{
    public class SpecialHourConfiguration: IEntityTypeConfiguration<SpecialHour>
    {
        public void Configure(EntityTypeBuilder<SpecialHour> builder)
        {
            builder.ToTable(nameof(SpecialHour)).HasKey(t => t.Id);
        }
    }
}
