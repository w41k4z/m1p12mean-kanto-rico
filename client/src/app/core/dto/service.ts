import { Prestation } from './prestation';

export class Service {
    constructor(
        public _id: string,
        public name: string,
        public status: string,
        public prestations: Prestation[]
    ) {}
}
