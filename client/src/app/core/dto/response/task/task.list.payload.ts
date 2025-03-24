import { Task} from '../../task';
import { Pageable } from '../pageable';

export class TaskListPayload {
    constructor(public tasks: Pageable<Task>) {}
}
