import { Prestation } from '../../prestation';
import { Pageable } from '../pageable';

export class PrestationListPayload {
    constructor(public prestations: Pageable<Prestation>) {}
}
