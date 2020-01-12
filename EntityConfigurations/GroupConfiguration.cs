using dutyChart.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace dutyChart.EntityConfigurations
{
    public class GroupConfiguration: IEntityTypeConfiguration<Group>
    {
        public void Configure(EntityTypeBuilder<Group> builder)
        {
            builder.ToTable(nameof(Group)).HasKey(t => t.Id);
        }
    }
}
