import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/services/airline.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AirlineAdminService } from 'src/app/services/airline-admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirplaneCompany } from 'src/app/models/airplaneCompany';
import { Flight } from 'src/app/models/Flight';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-aviocompany-flights',
  templateUrl: './admin-aviocompany-flights.component.html',
  styleUrls: ['./admin-aviocompany-flights.component.css']
})
export class AdminAviocompanyFlightsComponent implements OnInit {
  public checkedZaTransfer:Boolean=false;
  public locations:Location[];
  public company:AirplaneCompany;
  public companies:AirplaneCompany[];
  public addFlightForm: FormGroup;
  public selectedOptionOfStartPoint:string;
  public selectedOptionOfEndPoint:string;
  public selectedOptionOfNumberOfFlights:string;
  public selectedFirstDestination:string="";
  public selectedSecondDestination:string="";
  public selectedThirdDestination:string="";
  public flights:Flight[];

  errorMessageText = "";

  mainErrorMessage = "There was an error!";
  showMainErrorMessage = false;

  mainSuccessMessage = "Success!";
  showMainSuccessMessage = false;

  showSuccessMessage = false;
  showErrorMessage = false;
  constructor(
    public airlineService:AirlineService,
    public authenticateService: AuthenticationService,
    public adminAirlineService: AirlineAdminService,
    public formBuilder: FormBuilder,
    public router:Router

  ) { 
    this.addFlightForm = this.formBuilder.group({
      'startPoint': ['', [Validators.required]],
      'endPoint': ['', [Validators.required]],
      'datumPoletanja': ['', [Validators.required]],
      'vremePoletanja': ['', [Validators.required]],
      'datumSletanja': ['', [Validators.required]],
      'vremeSletanja': ['', [Validators.required]],
      'trajanjeLeta': ['', [Validators.required]],
      'udaljenostLeta': ['', [Validators.required]],
      'numberOfFlights': [''],
      'presedanjeSelect': [''],
      'cenaKarte': ['', [Validators.required]]
    });
  }
  //gets
  get startPoint() { return this.addFlightForm.get('startPoint');};
  get endPoint() { return this.addFlightForm.get('endPoint');};
  get datumPoletanja() { return this.addFlightForm.get('datumPoletanja');};
  get vremePoletanja() { return this.addFlightForm.get('vremePoletanja');};
  get datumSletanja() { return this.addFlightForm.get('datumSletanja');};
  get vremeSletanja() { return this.addFlightForm.get('vremeSletanja');};
  get trajanjeLeta() { return this.addFlightForm.get('trajanjeLeta');};
  get udaljenostLeta() { return this.addFlightForm.get('udaljenostLeta');};
  get numberOfFlights() { return this.addFlightForm.get('numberOfFlights');};
  get presedanjeSelect() { return this.addFlightForm.get('presedanjeSelect');};
  get cenaKarte() { return this.addFlightForm.get('cenaKarte');};


  ngOnInit(): void {
    this.checkCompany();
    
  }

  CheckedClicked()
  {
    this.checkedZaTransfer=true;
  }
  checkCompany()
  {
    this.airlineService.getCompanies()
    .subscribe(
      data => {
        console.log(data);
        this.companies=data;

        this.companies.forEach(element => {
          if(element.admin.id==this.authenticateService.currentUserValue.id)
          {
            this.company=element; 
            console.log("kompanija");
            console.log(this.company);
            this.getLocations();
            this.getFlights();
          

          }
        });
      
      },
      error => {
       console.log("ne radi");
      }
    );
  }

  getLocations(){
    this.adminAirlineService.getLocations(this.company.id).subscribe
    (
        data=>
        {
          console.log(data);
          this.locations=data;
          console.log("Lokacije");
          console.log(this.locations);
        },
        error => {
          console.log("ne radi");
         }
    );
    
  }

  onSubmit()
  {
 
    const flightInfo=
    {
      locationFrom:this.selectedOptionOfStartPoint,
      locationTo: this.selectedOptionOfEndPoint,
      dateOfTakingOff: this.datumPoletanja.value,
      timeOfTakingOff: this.vremePoletanja.value,
      dateOfLanding:this.datumSletanja.value,
      timeOfLanding: this.vremeSletanja.value,
      durationOfFlight: this.trajanjeLeta.value,
      distanceOfFlight: this.udaljenostLeta.value,
      numberOfTransfers: this.selectedOptionOfNumberOfFlights,
      locationOfTransfers: this.selectedFirstDestination+" "+this.selectedSecondDestination+" "+this.selectedThirdDestination,
      priceOfTicketOfFlight: this.cenaKarte.value
    };

    this.adminAirlineService.addFlight(this.company.id, flightInfo).subscribe(
      data => {
        console.log(data);
        this.showSuccessMessage = true;
        this.showErrorMessage = false;
      },
      error => {
       console.log("ne radi");
       this.errorMessageText = "There was an error.";
       this.showSuccessMessage = false;
       this.showErrorMessage = true;
      }
    );
  }
  selectStartPointChangeHandler (event: any) {
    
    this.selectedOptionOfStartPoint = event.target.value;
  }
  selectEndPointChangeHandler (event: any) {
    
    this.selectedOptionOfEndPoint = event.target.value;
  }
  selectNumberOfFlightsChangeHandler(event:any)
  {
    this.selectedOptionOfNumberOfFlights=event.target.value;
  }
  
  selectFirstDestinationOfTransferChangeHandler(event:any)
  {
    this.selectedFirstDestination=event.target.value;
  }
  selectSecondDestinationOfTransferChangeHandler(event:any)
  {
    this.selectedSecondDestination=event.target.value;
  }
  selectThirdDestinationOfTransferChangeHandler(event:any)
  {
    this.selectedThirdDestination=event.target.value;
  }
//get flights
 getFlights()
 {
  this.adminAirlineService.getFlights(this.company.id).subscribe
  (
      data=>
      {
        console.log(data);
        this.flights=data;
        console.log("Letovi");
        console.log(this.flights);
      },
      error => {
        console.log("ne radi");
       }
  );
 }

 deleteFlight(flightId)
 {
    this.adminAirlineService.deleteFlight(flightId).subscribe
    (
      data=>
      {
        this.getFlights();
      },
      err=>
      {
       console.log("ne radi");
      }
    );
 }

 seatsManage(flightId)
 {
   this.router.navigate([`/avioAdmin/company/seats/${flightId}`]);
 }

}
