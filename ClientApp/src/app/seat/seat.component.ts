import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AirlineService } from '../services/airline.service';
import { AuthenticationService } from '../services/authentication.service';
import { AirlineAdminService } from '../services/airline-admin.service';
import { Flight } from '../models/Flight';
import { AirplaneCompany } from '../models/airplaneCompany';
import { Seat } from '../models/Seat';


@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {
  public flightId:number;
  public seatFlight:number;
  public flights:Flight[];
  public flight:Flight;
  public company:AirplaneCompany;
  public companies:AirplaneCompany[];
  public seatDodat:Boolean=false;
  public seatNijeDodat:Boolean=false;
  public errorMessage:string;
  public seats:Seat[];
  public seat:Seat;
  public seatObrisan:Boolean=false;
  public seatNijeObrisan:Boolean=false;
  public deleteErrorMessage:string;
  public seatAvailable:Boolean=false;
  constructor(
    private route: ActivatedRoute,
    public airlineService:AirlineService,
    public authenticateService: AuthenticationService,
    public adminAirlineService: AirlineAdminService
  ) { }

  ngOnInit(): void {
    this.flightId=Number(this.route.snapshot.paramMap.get("flightId"));
    this.seatFlight=Number(this.route.snapshot.paramMap.get("numberOfSeat"));
    this.getSeats();
    
    
  }

 createSeat()
 {
   const flightInfo=
  {
    numberOfSeat:this.seatFlight
  };

  this.adminAirlineService.createSeat(this.flightId, flightInfo)
  .subscribe(
    data => {
      console.log(data);
      this.seatDodat=true;
      this.seatNijeDodat=false;
       
    },
    error => {
      this.errorMessage = "There was an error.";
      this.seatDodat = false;
      this.seatNijeDodat = true;
        
     console.log("ne radi");
    }
  );
 }
 getSeats()
 {
    this.adminAirlineService.getSeats(this.flightId)
    .subscribe(
      data => {
        console.log(data); 
        this.seats=data;
        this.getSeat();
      },
      error => {   
       console.log("ne radi");
      }
    );
 }

 getSeat()
 {
  this.seats.forEach(element => {
    if(element.numberOfSeat==this.seatFlight)
    {
      this.seat=element; 
      console.log("sediste");
      console.log(this.seat);
      this.seatAvailable=true;
    }
  });
 }
  
  deleteSeat()
  {
    this.adminAirlineService.deleteSeat(this.seat.id)
    .subscribe(
      data => {
        console.log(data); 
        this.getSeats();
        this.seatObrisan=true;
        this.seatNijeObrisan=false;
         
      },
      error => {   
       console.log("ne radi");
       this.deleteErrorMessage="Seat cannot be deleted!";
       this.seatObrisan = false;
       this.seatNijeObrisan = true;
      }
    );


  }



}
