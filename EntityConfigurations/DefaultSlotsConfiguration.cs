using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dutyChart.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace dutyChart.EntityConfigurations
{
    public class DefaultSlotsConfiguration: IEntityTypeConfiguration<DefaultSlots>
    {
        public void Configure(EntityTypeBuilder<DefaultSlots> builder)
        {
            builder.ToTable(nameof(DefaultSlots)).HasKey(t => t.Id);
        }
    }
}
