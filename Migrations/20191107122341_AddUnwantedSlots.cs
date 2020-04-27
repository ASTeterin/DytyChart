using Microsoft.EntityFrameworkCore.Migrations;

namespace dutyChart.Migrations
{
    public partial class AddUnwantedSlots : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Workers",
                table: "Workers");

            migrationBuilder.RenameTable(
                name: "Workers",
                newName: "Worker");

            migrationBuilder.AddColumn<string>(
                name: "UnwantedSlotsJson",
                table: "Worker",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Worker",
                table: "Worker",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Worker",
                table: "Worker");

            migrationBuilder.DropColumn(
                name: "UnwantedSlotsJson",
                table: "Worker");

            migrationBuilder.RenameTable(
                name: "Worker",
                newName: "Workers");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Workers",
                table: "Workers",
                column: "Id");
        }
    }
}
