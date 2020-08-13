import { Car } from './car';
import { RentacarCompany } from './rentacarCompany';

export class Branch {
    id: number;
    address: string;
    cars: Car[];
    company: RentacarCompany;
}