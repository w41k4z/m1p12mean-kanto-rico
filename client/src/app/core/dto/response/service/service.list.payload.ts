import { Service } from '../../service';
import { Pageable } from '../pageable';

export class ServiceListPayload {
    constructor(public services: Pageable<Service>) {}
}
