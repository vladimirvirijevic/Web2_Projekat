import { Role } from './role';

export class AuthUser {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    city:string;
    phone:string;
    token: string;
    role: Role;
    passwordChanged: boolean;
}