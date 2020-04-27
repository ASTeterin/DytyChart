using Microsoft.EntityFrameworkCore.Migrations;

namespace dutyChart.Migrations
{
    public partial class group_priority : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "numberDutyHours",
                table: "Group",
                newName: "NumberDutyHours");

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "Group",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Group");

            migrationBuilder.RenameColumn(
                name: "NumberDutyHours",
                table: "Group",
                newName: "numberDutyHours");
        }
    }
}
