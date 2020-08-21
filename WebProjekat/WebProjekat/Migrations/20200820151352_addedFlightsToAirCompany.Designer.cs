﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebProjekat.Data;

namespace WebProjekat.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20200820151352_addedFlightsToAirCompany")]
    partial class addedFlightsToAirCompany
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebProjekat.Models.AirplaneCompany", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("AdminId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Grade")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AdminId");

                    b.ToTable("AirplaneCompanies");
                });

            modelBuilder.Entity("WebProjekat.Models.Car", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("BranchId")
                        .HasColumnType("int");

                    b.Property<string>("Brand")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DropoffLocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Grade")
                        .HasColumnType("int");

                    b.Property<string>("Model")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PickupLocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("PricePerDay")
                        .HasColumnType("float");

                    b.Property<int>("Seats")
                        .HasColumnType("int");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BranchId");

                    b.ToTable("Cars");
                });

            modelBuilder.Entity("WebProjekat.Models.CarReservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CarId")
                        .HasColumnType("int");

                    b.Property<int>("Days")
                        .HasColumnType("int");

                    b.Property<string>("DropoffDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PickupDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("TotalPrice")
                        .HasColumnType("float");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CarId");

                    b.HasIndex("UserId");

                    b.ToTable("CarReservations");
                });

            modelBuilder.Entity("WebProjekat.Models.Flight", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("DateOfLanding")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DateOfTakingOff")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("DistanceOfFlight")
                        .HasColumnType("bigint");

                    b.Property<string>("DurationOfFlight")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LocationFrom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LocationOfTransfers")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LocationTo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumberOfTransfers")
                        .HasColumnType("int");

                    b.Property<double>("PriceOfTicketOfFlight")
                        .HasColumnType("float");

                    b.Property<string>("TimeOfFlight")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TimeOfLanding")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TimeOfTakingOff")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("Flights");
                });

            modelBuilder.Entity("WebProjekat.Models.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ComapnyId")
                        .HasColumnType("int");

                    b.Property<double>("Lat")
                        .HasColumnType("float");

                    b.Property<double>("Long")
                        .HasColumnType("float");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ComapnyId");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("WebProjekat.Models.RentacarBranch", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("CompanyId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("RentacarBranches");
                });

            modelBuilder.Entity("WebProjekat.Models.RentacarCompany", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("AdminId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Grade")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AdminId");

                    b.ToTable("RentacarCompanies");
                });

            modelBuilder.Entity("WebProjekat.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ConfirmationToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Confirmed")
                        .HasColumnType("bit");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsCompanyAdmin")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PasswordChanged")
                        .HasColumnType("bit");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebProjekat.Models.AirplaneCompany", b =>
                {
                    b.HasOne("WebProjekat.Models.User", "Admin")
                        .WithMany("AirlineCompanies")
                        .HasForeignKey("AdminId");
                });

            modelBuilder.Entity("WebProjekat.Models.Car", b =>
                {
                    b.HasOne("WebProjekat.Models.RentacarBranch", "Branch")
                        .WithMany("Cars")
                        .HasForeignKey("BranchId");
                });

            modelBuilder.Entity("WebProjekat.Models.CarReservation", b =>
                {
                    b.HasOne("WebProjekat.Models.Car", "Car")
                        .WithMany("CarReservations")
                        .HasForeignKey("CarId");

                    b.HasOne("WebProjekat.Models.User", "User")
                        .WithMany("CarReservations")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("WebProjekat.Models.Flight", b =>
                {
                    b.HasOne("WebProjekat.Models.AirplaneCompany", "Company")
                        .WithMany("Flights")
                        .HasForeignKey("CompanyId");
                });

            modelBuilder.Entity("WebProjekat.Models.Location", b =>
                {
                    b.HasOne("WebProjekat.Models.AirplaneCompany", "Comapny")
                        .WithMany("Destinations")
                        .HasForeignKey("ComapnyId");
                });

            modelBuilder.Entity("WebProjekat.Models.RentacarBranch", b =>
                {
                    b.HasOne("WebProjekat.Models.RentacarCompany", "Company")
                        .WithMany("Branches")
                        .HasForeignKey("CompanyId");
                });

            modelBuilder.Entity("WebProjekat.Models.RentacarCompany", b =>
                {
                    b.HasOne("WebProjekat.Models.User", "Admin")
                        .WithMany("RentacarCompany")
                        .HasForeignKey("AdminId");
                });
#pragma warning restore 612, 618
        }
    }
}
