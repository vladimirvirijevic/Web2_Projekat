import { AuthUser } from './authUser';
import { Flight } from './Flight';
import { AirplaneCompany } from './airplaneCompany';

export class FlightReservation
{

    id:number;
    userWhoReserved:AuthUser;
    flightOfReservation:Flight;
    airplaneCompanyOfReservation: AirplaneCompany;
    priceOfReservation: number;
    seatOfReservation:number;
    firstNameOfPersonWhoSits:string;
    secondNameOfPersonWhoSits:string;
    phoneOfUserWhoSits:string;
    cityOfUserWhoSits:String;
    numberOfPassport:string;
    statusOfReservation:string;
    dateOfReservation:string;



}