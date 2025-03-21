import { Transaction } from '../../transaction';
import { Pageable } from '../pageable';

export class TokenTransactionPayload {
    constructor(public transactions: Pageable<Transaction>) {}
}
