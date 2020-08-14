import { Flight } from './Flight';

export class AirplaneCompany {
    id: number;
    name: string;
    address: string;
    description: string;
    grade: number;
    destinations: Location[];
    flights: Flight[];
}