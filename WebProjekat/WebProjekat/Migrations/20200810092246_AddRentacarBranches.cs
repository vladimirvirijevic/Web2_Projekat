using Microsoft.EntityFrameworkCore.Migrations;

namespace WebProjekat.Migrations
{
    public partial class AddRentacarBranches : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_RentacarCompanies_CompanyId",
                table: "Cars");

            migrationBuilder.DropIndex(
                name: "IX_Cars_CompanyId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Cars");

            migrationBuilder.AddColumn<int>(
                name: "BranchId",
                table: "Cars",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "RentacarBranches",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(nullable: true),
                    CompanyId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentacarBranches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RentacarBranches_RentacarCompanies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "RentacarCompanies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cars_BranchId",
                table: "Cars",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_RentacarBranches_CompanyId",
                table: "RentacarBranches",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_RentacarBranches_BranchId",
                table: "Cars",
                column: "BranchId",
                principalTable: "RentacarBranches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_RentacarBranches_BranchId",
                table: "Cars");

            migrationBuilder.DropTable(
                name: "RentacarBranches");

            migrationBuilder.DropIndex(
                name: "IX_Cars_BranchId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "BranchId",
                table: "Cars");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "Cars",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Cars_CompanyId",
                table: "Cars",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_RentacarCompanies_CompanyId",
                table: "Cars",
                column: "CompanyId",
                principalTable: "RentacarCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
