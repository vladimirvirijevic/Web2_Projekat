using Microsoft.EntityFrameworkCore.Migrations;

namespace WebProjekat.Migrations
{
    public partial class AddedDifPropToFriendModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdKoJePrihvatio",
                table: "Friends");

            migrationBuilder.AddColumn<int>(
                name: "KoJePrihvatioId",
                table: "Friends",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Friends_KoJePrihvatioId",
                table: "Friends",
                column: "KoJePrihvatioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Friends_Users_KoJePrihvatioId",
                table: "Friends",
                column: "KoJePrihvatioId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Friends_Users_KoJePrihvatioId",
                table: "Friends");

            migrationBuilder.DropIndex(
                name: "IX_Friends_KoJePrihvatioId",
                table: "Friends");

            migrationBuilder.DropColumn(
                name: "KoJePrihvatioId",
                table: "Friends");

            migrationBuilder.AddColumn<int>(
                name: "IdKoJePrihvatio",
                table: "Friends",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
