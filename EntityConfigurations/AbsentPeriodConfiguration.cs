using dutyChart.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dutyChart.EntityConfigurations
{
    public class AbsentPeriodConfiguration: IEntityTypeConfiguration<AbsentPeriod>
    {
        public void Configure(EntityTypeBuilder<AbsentPeriod> builder)
        {
            builder.ToTable(nameof(AbsentPeriod)).HasKey(t => t.Id);

        }
    }
}
