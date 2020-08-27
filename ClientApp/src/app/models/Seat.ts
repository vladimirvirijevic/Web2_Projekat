import { AuthUser } from './authUser';
import { AirplaneCompany } from './airplaneCompany';
import { Flight } from './Flight';

export class Seat {

    id:number;
    numberOfSeat:number;
    firstNameofUser: string;
    lastNameofUser: string;
    cityofNonUser:string;
    phoneofNonUser:string
    isItReserved:Boolean;
    doesItExists:Boolean;
    isItAvailable:Boolean;
    whoReservedIt:AuthUser;
    whoCreatedIt:AirplaneCompany;
    flightBelonging:Flight;


}