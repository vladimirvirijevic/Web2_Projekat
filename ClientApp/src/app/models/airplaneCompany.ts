import { Flight } from './Flight';
import { AuthUser } from './authUser';

export class AirplaneCompany {
    id: number;
    name: string;
    address: string;
    description: string;
    grade: number;
    destinations:Location[];
    admin:AuthUser;
    
   
}