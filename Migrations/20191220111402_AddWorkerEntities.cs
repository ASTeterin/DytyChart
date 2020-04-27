using Microsoft.EntityFrameworkCore.Migrations;

namespace dutyChart.Migrations
{
    public partial class AddWorkerEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DesirableSlotsJson",
                table: "Worker",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AbsentPeriod_WorkerId",
                table: "AbsentPeriod",
                column: "WorkerId");

            migrationBuilder.AddForeignKey(
                name: "FK_AbsentPeriod_Worker_WorkerId",
                table: "AbsentPeriod",
                column: "WorkerId",
                principalTable: "Worker",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AbsentPeriod_Worker_WorkerId",
                table: "AbsentPeriod");

            migrationBuilder.DropIndex(
                name: "IX_AbsentPeriod_WorkerId",
                table: "AbsentPeriod");

            migrationBuilder.DropColumn(
                name: "DesirableSlotsJson",
                table: "Worker");
        }
    }
}
