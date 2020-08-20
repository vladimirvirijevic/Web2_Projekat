import { Branch } from './branch';
import { Car } from './car';

export class CarReservation {
    id: number;
    days: number;
    status: string;
    totalPrice: number;
    pickupDate: string;
    dropoffDate: string;
    car: Car;
}