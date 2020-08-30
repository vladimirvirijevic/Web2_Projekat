import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AirlineAdminService } from '../services/airline-admin.service';
import { Seat } from '../models/Seat';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/User';
import { AuthUser } from '../models/authUser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlightReservationService } from '../services/flight-reservation.service';
import { FlightReservation } from '../models/FlightReservation';

@Component({
  selector: 'app-user-reserves',
  templateUrl: './user-reserves.component.html',
  styleUrls: ['./user-reserves.component.css']
})
export class UserReservesComponent implements OnInit {
  public flightId:number;
  public numberOfSeat:number;
  public sedista:Seat[];
  public thisSeatAvailable:string;
  public isSeatAvailable:Boolean;
  public user:AuthUser;
  public nonregisterClicked:Boolean;
  public makeReservation: FormGroup;
  public isReserved:Boolean;
  public reservedOk:Boolean;
  public reservedBad:Boolean;
  public okMessage:string;
  public errorMessage:string;
  public reservations:FlightReservation[];

  constructor( 
    private route: ActivatedRoute,
    public router:Router,
    public adminAirlineService: AirlineAdminService,
    public authService: AuthenticationService,
    public formBuilder: FormBuilder,
    public flightReservationService: FlightReservationService
    ) { 
      this.makeReservation = this.formBuilder.group({
      'passportNumber': [''],
      'nonUserFirstName': [''],
      'nonUserLastName': [''],
      'cityNonUser': [''],
      'phoneNonUser': [''],
      'nonUserPassport': [''],
      'dateOfReservation':['']
      });

    }
    get passportNumber() { return this.makeReservation.get('passportNumber');};
    get nonUserFirstName() { return this.makeReservation.get('nonUserFirstName');};
    get nonUserLastName() { return this.makeReservation.get('nonUserLastName');};
    get cityNonUser() { return this.makeReservation.get('cityNonUser');};
    get phoneNonUser() { return this.makeReservation.get('phoneNonUser');};
    get nonUserPassport() { return this.makeReservation.get('nonUserPassport');};
    get dateOfReservation() { return this.makeReservation.get('dateOfReservation');};

  ngOnInit(): void {

    this.flightId=Number(this.route.snapshot.paramMap.get("idLeta"));
    this.numberOfSeat=Number(this.route.snapshot.paramMap.get("idBrojSedista"));
    this.getSeats();
    this.user=this.authService.currentUserValue;
    this.getFlightReservations();
  }

  getSeats()
  {
      this.adminAirlineService.getSeats(this.flightId).subscribe
      (
        data=>
        {
         this.sedista=data;
         console.log(data);
         this.checkAvailability();
         this.checkReservation();
        },
        err=>
        {
         console.log("ne radi");
        }
      );
  }
  checkAvailability()
  {
    this.sedista.forEach(element => {
      if(element.numberOfSeat==this.numberOfSeat)
      {
        if(!element.isItAvailable)
        {
              this.thisSeatAvailable="This seat isn't available!";
              console.log(this.thisSeatAvailable);
              this.isSeatAvailable=false;
        }
        else
        {
          this.isSeatAvailable=true;
        }
      }});
  }

  checkReservation()
  {
    this.sedista.forEach(element => {
      if(element.numberOfSeat==this.numberOfSeat)
      {
        if(element.isItReserved)
        {
              
              console.log(this.isReserved);
              this.isReserved=true;
        }
        else
        {
          this.isReserved=false;
        }
      }});
  }
  CheckedClickedForUnregistered()
  {
    this.nonregisterClicked=true;
  }

  onSubmit()
{
  const reservationInfo=
  {
    seatOfReservation: this.numberOfSeat,
    firstNameOfPersonWhoSits:this.nonUserFirstName.value,
    secondNameOfPersonWhoSits:this.nonUserLastName.value,
    phoneOfUserWhoSits:this.phoneNonUser.value,
    cityOfUserWhoSits:this.cityNonUser.value,
    numberOfPassport:this.passportNumber.value,
    numberOfPassportOfNonUser:this.nonUserPassport.value,
    dateOfReservation:this.dateOfReservation.value
  };

  this.flightReservationService.makeReservation(this.flightId, reservationInfo).
  subscribe
      (
        data=>
        {
        
         console.log("radi");
         
         this.reservedOk=true;
         this.reservedBad=false;
         this.okMessage="Reservation of seat in the flight was successful! Have a nice trip!"
          
        },
        err=>
        {
         console.log("ne radi");
         this.reservedOk=false;
         this.reservedBad=true;
         this.errorMessage="Something went wrong!";
        }
      );
}

  getFlightReservations()
  {
      this.flightReservationService.getReservations(this.authService.currentUserValue.id).subscribe
      (
        
        data=>
        {
         this.reservations=data;
         console.log(data);
        },
        err=>
        {
         console.log("ne radi");
        }

      );

  }

}
