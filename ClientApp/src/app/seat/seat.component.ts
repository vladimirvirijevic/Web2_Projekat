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
  public seatCreated:Boolean=false;
  public checkedClickedNon:Boolean=false;
  public checkedClicked:Boolean=false;
  public seatEditovan:Boolean=false;
  public seatNijeEditovan:Boolean=false;
  public editErrorMessage:string;
  public isItAvailable:Boolean=false;
  public isItExistiable:Boolean=false;
  public status:Boolean;

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
   const seatInfo=
  {
    numberOfSeat:this.seatFlight
  };

  this.adminAirlineService.createSeat(this.flightId, seatInfo)
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
      this.seatCreated=true;
      if(this.seat.isItAvailable)
      {
        this.status=true;
      }
    
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

  CheckedClickedForNonExistance()
  {
    this.checkedClickedNon=true;
    this.isItAvailable=false;
    this.isItExistiable=false;
  }
  CheckedClickedForExistance()
  {
    this.checkedClicked=true;
    this.isItAvailable=true;
    this.isItExistiable=true;
  }
  editSeat()
  {
    
    const seatEditInfo=
    {
      numberOfSeat:this.seatFlight,
      isItAvailable:this.isItAvailable,
      doesItExist:this.isItExistiable
    };
  
  
    this.adminAirlineService.editSeat(this.flightId, seatEditInfo)
    .subscribe(
      data => {
        console.log(data); 
        this.getSeats();
        this.seatEditovan=true;
        this.seatNijeEditovan=false;
         
      },
      error => {   
       console.log("ne radi");
       this.editErrorMessage="Seat cannot be edited!";
       this.seatEditovan = false;
       this.seatNijeEditovan = true;
      }
    );
}

}
