using Microsoft.EntityFrameworkCore.Migrations;

namespace dutyChart.Migrations
{
    public partial class worker4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CountAbsencePeriod",
                table: "Worker",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CountAbsencePeriod",
                table: "Worker");
        }
    }
}
