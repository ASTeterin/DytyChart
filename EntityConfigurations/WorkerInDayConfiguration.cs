using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dutyChart.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace dutyChart.EntityConfigurations
{
    public class WorkerInDayConfiguration: IEntityTypeConfiguration<WorkerInDay>
    {
        public void Configure(EntityTypeBuilder<WorkerInDay> builder)
        {
            builder.ToTable(nameof(WorkerInDay)).HasKey(t => t.Id);

            builder.Property(f => f.Date).HasColumnType("date");

        }
    }
}
