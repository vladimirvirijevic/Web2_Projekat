using Microsoft.EntityFrameworkCore.Migrations;

namespace WebProjekat.Migrations
{
    public partial class AddedFlightReservationModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Reservations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PriceOfReservation = table.Column<int>(nullable: false),
                    SeatOfReservation = table.Column<int>(nullable: false),
                    FirstNameOfPersonWhoSits = table.Column<string>(nullable: true),
                    SecondNameOfPersonWhoSits = table.Column<string>(nullable: true),
                    PhoneOfUserWhoSits = table.Column<string>(nullable: true),
                    CityOfUserWhoSits = table.Column<string>(nullable: true),
                    NumberOfPassport = table.Column<string>(nullable: true),
                    StatusOfReservation = table.Column<string>(nullable: true),
                    UserWhoReservedId = table.Column<int>(nullable: true),
                    FlightOfReservationId = table.Column<int>(nullable: true),
                    AirplaneCompanyOfReservationId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reservations_AirplaneCompanies_AirplaneCompanyOfReservationId",
                        column: x => x.AirplaneCompanyOfReservationId,
                        principalTable: "AirplaneCompanies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reservations_Flights_FlightOfReservationId",
                        column: x => x.FlightOfReservationId,
                        principalTable: "Flights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reservations_Users_UserWhoReservedId",
                        column: x => x.UserWhoReservedId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_AirplaneCompanyOfReservationId",
                table: "Reservations",
                column: "AirplaneCompanyOfReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_FlightOfReservationId",
                table: "Reservations",
                column: "FlightOfReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_UserWhoReservedId",
                table: "Reservations",
                column: "UserWhoReservedId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reservations");
        }
    }
}
