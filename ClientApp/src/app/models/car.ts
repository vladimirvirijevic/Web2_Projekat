import { Branch } from './branch';
import { GradeCar } from './gradeCar';

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
    grade: number;
    grades: GradeCar[];
}