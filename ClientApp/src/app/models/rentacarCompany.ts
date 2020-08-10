import { Branch } from './branch';

export class RentacarCompany {
    id: number;
    name: string;
    address: string;
    description: string;
    grade: number;
    branches: Branch[];
}