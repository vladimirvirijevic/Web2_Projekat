using Microsoft.EntityFrameworkCore.Migrations;

namespace WebProjekat.Migrations
{
    public partial class AddGradeAndDatesToCar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Locations_AirplaneCompanies_CompanyId",
                table: "Locations");

            migrationBuilder.DropIndex(
                name: "IX_Locations_CompanyId",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Locations");

            migrationBuilder.AddColumn<int>(
                name: "CompanyTest3Id",
                table: "Locations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AvailableFrom",
                table: "Cars",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AvailableUntil",
                table: "Cars",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Grade",
                table: "Cars",
                nullable: false,
                defaultValue: 0);

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "AvailableFrom",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "AvailableUntil",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Grade",
                table: "Cars");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "Locations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Locations_CompanyId",
                table: "Locations",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_AirplaneCompanies_CompanyId",
                table: "Locations",
                column: "CompanyId",
                principalTable: "AirplaneCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
