import { Role } from './role';

export class AuthUser {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    role: Role;
    passwordChanged: boolean;
}