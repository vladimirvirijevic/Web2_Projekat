using Microsoft.EntityFrameworkCore.Migrations;

namespace WebProjekat.Migrations
{
    public partial class AddAdminToCarCompanies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdminId",
                table: "RentacarCompanies",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RentacarCompanies_AdminId",
                table: "RentacarCompanies",
                column: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_RentacarCompanies_Users_AdminId",
                table: "RentacarCompanies",
                column: "AdminId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentacarCompanies_Users_AdminId",
                table: "RentacarCompanies");

            migrationBuilder.DropIndex(
                name: "IX_RentacarCompanies_AdminId",
                table: "RentacarCompanies");

            migrationBuilder.DropColumn(
                name: "AdminId",
                table: "RentacarCompanies");
        }
    }
}
