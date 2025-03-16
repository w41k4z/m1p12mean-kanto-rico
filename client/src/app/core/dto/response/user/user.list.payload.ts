import { User } from '../../user';

export class UserListPayload {
    constructor(public users: User[]) {}
}
