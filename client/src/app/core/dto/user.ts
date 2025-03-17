import { Role } from './role';

export class User {
    constructor(
        public _id: string,
        public lastName: string,
        public firstName: string,
        public username: string,
        public role: Role
    ) {}
}
