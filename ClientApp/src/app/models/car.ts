import { Branch } from './branch';

export class Car {
    id: number;
    model: string;
    brand: string;
    availableFrom: string;
    availableUntil: string;
    seats: number;
    year: number;
    pricePerDay: number;
    type: string;
    pickupLocation: string;
    dropoffLocation: string;
    branchAddress: string;
    branch: Branch;
}