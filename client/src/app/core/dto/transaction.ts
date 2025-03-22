export class Transaction {
    constructor(
        public transactionDate: Date,
        public amount: number,
        public description: string
    ) {}
}
