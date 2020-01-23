using dutyChart.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace dutyChart.EntityConfigurations
{
    public class HourConfiguration : IEntityTypeConfiguration<Hour>
    {
        public void Configure( EntityTypeBuilder<Hour> builder )
        {
            builder.ToTable( nameof( Hour ) ).HasKey( t => t.Id );
            builder.Property( f => f.Date ).HasColumnType( "date" );
            builder.HasMany( Hour.SlotsProperty )
                .WithOne()
                .HasForeignKey( fk => fk.HourId )
                .OnDelete( DeleteBehavior.Cascade );
            builder.Ignore( t => t.Slots );
        }
    }
}
