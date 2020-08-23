import { AuthUser } from './authUser';
import { AirplaneCompany } from './airplaneCompany';
import { Flight } from './Flight';

export class Seat {

    idSeat:number;
    nameOfNonUser:string; 
    firstNameofNonUser: string;
    lastNameofNonUser: string;
    cityofNonUser:string;
    phoneofNonUser:string
    isItReserved:Boolean;
    doesItExsists:Boolean;
    whoReservedIt:AuthUser;
    whoCreatedIt:AirplaneCompany;
    flightBelonging:Flight;


}