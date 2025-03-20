import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/core/dto/transaction';
import { TokenService } from 'src/app/core/services/api/token/token.service';

@Component({
    selector: 'app-token-transaction',
    templateUrl: './token-transaction.component.html',
    styleUrls: ['./token-transaction.component.scss'],
})
export class TokenTransactionComponent implements OnInit {
    fromDate: Date | null = null;
    toDate: Date | null = null;
    transactions: Transaction[] = [];

    loadingTransactions: boolean = false;
    totalRecords: number = 0;
    currentPage: number = 0;
    pageSize: number = 10;

    constructor(private tokenService: TokenService) {}

    ngOnInit(): void {
        this.loadTransactions(0, this.pageSize);
    }

    private loadTransactions(page: number, size: number) {
        const fromDateFilter = this.fromDate
            ? this.fromDate.toISOString()
            : '1970-01-01';
        const toDateFilter = this.toDate
            ? this.toDate.toISOString()
            : new Date().toISOString();

        this.tokenService
            .getTransactions(page, size, fromDateFilter, toDateFilter)
            .subscribe({
                next: (res) => {
                    if (res.payload) {
                        this.transactions = res.payload.transactions.content;
                        this.totalRecords =
                            res.payload.transactions.totalElements;
                        this.currentPage = res.payload.transactions.page;
                    }
                },
                complete: () => {
                    this.loadingTransactions = false;
                },
            });
    }

    onPageChange(event: { first: number; rows: number }) {
        this.loadTransactions(event.first, event.rows);
    }

    onFilter() {
        if (this.fromDate || this.toDate) {
            this.loadTransactions(0, this.pageSize);
        }
    }
}
