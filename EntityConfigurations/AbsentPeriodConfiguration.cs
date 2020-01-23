using dutyChart.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace dutyChart.EntityConfigurations
{
    public class AbsentPeriodConfiguration : IEntityTypeConfiguration<AbsentPeriod>
    {
        public void Configure( EntityTypeBuilder<AbsentPeriod> builder )
        {
            builder.ToTable( nameof( AbsentPeriod ) ).HasKey( t => t.Id );

            builder.Property( f => f.Start ).HasColumnType( "date" );
            builder.Property( f => f.End ).HasColumnType( "date" );

        }
    }
}
