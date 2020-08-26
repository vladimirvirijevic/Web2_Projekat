import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AirlineService } from '../services/airline.service';
import { AuthenticationService } from '../services/authentication.service';
import { AirlineAdminService } from '../services/airline-admin.service';
import { Flight } from '../models/Flight';
import { AirplaneCompany } from '../models/airplaneCompany';

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
  constructor(
    private route: ActivatedRoute,
    public airlineService:AirlineService,
    public authenticateService: AuthenticationService,
    public adminAirlineService: AirlineAdminService
  ) { }

  ngOnInit(): void {
    this.flightId=Number(this.route.snapshot.paramMap.get("flightId"));
    this.seatFlight=Number(this.route.snapshot.paramMap.get("numberOfSeat"));
    
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



}
