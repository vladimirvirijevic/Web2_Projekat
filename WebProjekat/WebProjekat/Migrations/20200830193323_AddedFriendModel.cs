﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace WebProjekat.Migrations
{
    public partial class AddedFriendModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Friends",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FriendFirstName = table.Column<string>(nullable: true),
                    FriendLastName = table.Column<string>(nullable: true),
                    DaLiJePrihvacen = table.Column<bool>(nullable: false),
                    KoJeRezervisaoId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Friends", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Friends_Users_KoJeRezervisaoId",
                        column: x => x.KoJeRezervisaoId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Friends_KoJeRezervisaoId",
                table: "Friends",
                column: "KoJeRezervisaoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Friends");
        }
    }
}
