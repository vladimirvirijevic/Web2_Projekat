using Microsoft.EntityFrameworkCore.Migrations;

namespace WebProjekat.Migrations
{
    public partial class AddPriceToCars : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvailableFrom",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "AvailableUntil",
                table: "Cars");

            migrationBuilder.AddColumn<double>(
                name: "PricePerDay",
                table: "Cars",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PricePerDay",
                table: "Cars");

            migrationBuilder.AddColumn<string>(
                name: "AvailableFrom",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AvailableUntil",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
