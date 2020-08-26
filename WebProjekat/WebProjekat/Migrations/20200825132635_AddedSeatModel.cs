using Microsoft.EntityFrameworkCore.Migrations;

namespace WebProjekat.Migrations
{
    public partial class AddedSeatModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Seats",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstNameOfUser = table.Column<string>(nullable: true),
                    LastNameOfUser = table.Column<string>(nullable: true),
                    CityOfNonUser = table.Column<string>(nullable: true),
                    PhoneOfNonUser = table.Column<string>(nullable: true),
                    IsItReserved = table.Column<bool>(nullable: false),
                    IsItAvailable = table.Column<bool>(nullable: false),
                    DoesItExist = table.Column<bool>(nullable: false),
                    WhoReservedItId = table.Column<int>(nullable: true),
                    WhoCreatedItId = table.Column<int>(nullable: true),
                    FlightBelongingId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Seats_Flights_FlightBelongingId",
                        column: x => x.FlightBelongingId,
                        principalTable: "Flights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Seats_AirplaneCompanies_WhoCreatedItId",
                        column: x => x.WhoCreatedItId,
                        principalTable: "AirplaneCompanies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Seats_Users_WhoReservedItId",
                        column: x => x.WhoReservedItId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Seats_FlightBelongingId",
                table: "Seats",
                column: "FlightBelongingId");

            migrationBuilder.CreateIndex(
                name: "IX_Seats_WhoCreatedItId",
                table: "Seats",
                column: "WhoCreatedItId");

            migrationBuilder.CreateIndex(
                name: "IX_Seats_WhoReservedItId",
                table: "Seats",
                column: "WhoReservedItId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Seats");
        }
    }
}
