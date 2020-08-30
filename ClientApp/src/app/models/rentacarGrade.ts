import { Car } from './car';
import { AuthUser } from './authUser';
import { RentacarCompany } from './rentacarCompany';

export class RentacarGrade {
    id: number;
    grade: number;
    company: RentacarCompany;
    user: AuthUser;
}