export class Task{
    constructor(
        public _id: string,
        public idClient: string,
        public dateDebut: Date,
        public status: string,
    ) {}
}