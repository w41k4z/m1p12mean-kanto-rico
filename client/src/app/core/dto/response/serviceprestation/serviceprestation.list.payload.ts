import { ServicePrestation } from '../../serviceprestation';
import { Pageable } from '../pageable';

export class ServicePrestationListPayload {
    constructor(public serviceprestation: Pageable<ServicePrestation>) {}
}
