import { Car } from './car';
import { AuthUser } from './authUser';

export class GradeCar {
    id: number;
    grade: number;
    car: Car;
    user: AuthUser;
}