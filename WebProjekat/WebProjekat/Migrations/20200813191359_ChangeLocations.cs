using Microsoft.EntityFrameworkCore.Migrations;

namespace WebProjekat.Migrations
{
    public partial class ChangeLocations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Locations_AirplaneCompanies_CompanyTest3Id",
                table: "Locations");

            migrationBuilder.DropIndex(
                name: "IX_Locations_CompanyTest3Id",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "CompanyTest3Id",
                table: "Locations");

            migrationBuilder.AddColumn<int>(
                name: "ComapnyId",
                table: "Locations",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Locations_ComapnyId",
                table: "Locations",
                column: "ComapnyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_AirplaneCompanies_ComapnyId",
                table: "Locations",
                column: "ComapnyId",
                principalTable: "AirplaneCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Locations_AirplaneCompanies_ComapnyId",
                table: "Locations");

            migrationBuilder.DropIndex(
                name: "IX_Locations_ComapnyId",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "ComapnyId",
                table: "Locations");

            migrationBuilder.AddColumn<int>(
                name: "CompanyTest3Id",
                table: "Locations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Locations_CompanyTest3Id",
                table: "Locations",
                column: "CompanyTest3Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_AirplaneCompanies_CompanyTest3Id",
                table: "Locations",
                column: "CompanyTest3Id",
                principalTable: "AirplaneCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
