import { AirplaneCompany } from './airplaneCompany';
import { Time } from '@angular/common';

export class Flight
{
    id:number;
    locationFrom:string;
    locationTo:string;
    dateOfTakingOff:string;
    timeOfTakingOff:string;
    dateOfLanding:string;
    timeOfLanding:string;
    durationOfFlight:string;
    distanceOfFlight:number;
    numberOfTransfers:number;
    locationOfTransfers:string;
    priceOfTicketOfFlight:number;
    company:AirplaneCompany;
}