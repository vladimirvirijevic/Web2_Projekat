using Microsoft.EntityFrameworkCore.Migrations;

namespace WebProjekat.Migrations
{
    public partial class AddFlightsModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Flights",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LocationFrom = table.Column<string>(nullable: true),
                    LocationTo = table.Column<string>(nullable: true),
                    DateOfTakingOff = table.Column<string>(nullable: true),
                    TimeOfTakingOff = table.Column<string>(nullable: true),
                    DateOfLanding = table.Column<string>(nullable: true),
                    TimeOfLanding = table.Column<string>(nullable: true),
                    TimeOfFlight = table.Column<string>(nullable: true),
                    DurationOfFlight = table.Column<string>(nullable: true),
                    DistanceOfFlight = table.Column<long>(nullable: false),
                    NumberOfTransfers = table.Column<int>(nullable: false),
                    LocationOfTransfers = table.Column<string>(nullable: true),
                    PriceOfTicketOfFlight = table.Column<double>(nullable: false),
                    CompanyId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flights", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Flights_AirplaneCompanies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "AirplaneCompanies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Flights_CompanyId",
                table: "Flights",
                column: "CompanyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Flights");
        }
    }
}
