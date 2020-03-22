using dutyChart.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dutyChart.EntityConfigurations
{
    public class SpecialHourInDayConfiguration: IEntityTypeConfiguration<SpecialHourInDay>
    {
        public void Configure(EntityTypeBuilder<SpecialHourInDay> builder)
        {
            builder.ToTable(nameof(SpecialHourInDay)).HasKey(t => t.Id);
        }
    }
}
