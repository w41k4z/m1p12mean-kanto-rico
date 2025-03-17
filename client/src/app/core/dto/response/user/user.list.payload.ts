import { User } from '../../user';
import { Pageable } from '../pageable';

export class UserListPayload {
    constructor(public users: Pageable<User>) {}
}
