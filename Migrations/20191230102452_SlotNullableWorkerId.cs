using Microsoft.EntityFrameworkCore.Migrations;

namespace dutyChart.Migrations
{
    public partial class SlotNullableWorkerId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "WorkerId",
                table: "Slot",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "WorkerId",
                table: "Slot",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
