using Microsoft.EntityFrameworkCore.Migrations;

namespace WebProjekat.Migrations
{
    public partial class AddAirplaneComapniesToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdminId",
                table: "AirplaneCompanies",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AirplaneCompanies_AdminId",
                table: "AirplaneCompanies",
                column: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_AirplaneCompanies_Users_AdminId",
                table: "AirplaneCompanies",
                column: "AdminId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AirplaneCompanies_Users_AdminId",
                table: "AirplaneCompanies");

            migrationBuilder.DropIndex(
                name: "IX_AirplaneCompanies_AdminId",
                table: "AirplaneCompanies");

            migrationBuilder.DropColumn(
                name: "AdminId",
                table: "AirplaneCompanies");
        }
    }
}
