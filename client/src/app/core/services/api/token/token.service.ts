import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/core/config/endpoints';
import { ApiResponse } from 'src/app/core/dto/response/api.response';
import { AvailableTokenPayload } from 'src/app/core/dto/response/token/available.token.payload';
import { TokenTransactionPayload } from 'src/app/core/dto/response/token/token.transaction.payload';
import { env } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    constructor(private httpClient: HttpClient) {}

    getUserAvailableTokens() {
        return this.httpClient.get<ApiResponse<AvailableTokenPayload>>(
            `${env.baseUrl}/${Endpoints.TOKENS}`
        );
    }

    getTransactions(
        page: number,
        size: number,
        fromDate: string,
        toDate: string
    ) {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString())
            .set('fromDate', fromDate)
            .set('toDate', toDate);
        return this.httpClient.get<ApiResponse<TokenTransactionPayload>>(
            `${env.baseUrl}/${Endpoints.TOKENS}/transactions`,
            { params }
        );
    }

    createTransaction(description: string, amount: number) {
        return this.httpClient.post(`${env.baseUrl}/${Endpoints.TOKENS}`, {
            description,
            amount,
        });
    }
}
