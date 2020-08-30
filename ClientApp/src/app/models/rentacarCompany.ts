import { Branch } from './branch';
import { RentacarGrade } from './rentacarGrade';

export class RentacarCompany {
    id: number;
    name: string;
    address: string;
    description: string;
    grade: number;
    branches: Branch[];
    grades: RentacarGrade[];
}