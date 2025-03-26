import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/core/config/endpoints';
import { Prestation } from 'src/app/core/dto/prestation';
import { ApiResponse } from 'src/app/core/dto/response/api.response';
import { PrestationListPayload } from 'src/app/core/dto/response/prestation/prestation.list.payload';
import { env } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PrestationService {
    constructor(private httpClient: HttpClient) {}

    getPrestations(page: number, size: number, filters: any) {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        if (filters) {
            Object.keys(filters).forEach((key) => {
                if (filters[key][0].value) {
                    params = params.set(
                        `filters[${key}]`,
                        JSON.stringify(filters[key][0])
                    );
                }
            });
        }
    
        return this.httpClient.get<ApiResponse<PrestationListPayload>>(
            `${env.baseUrl}/${Endpoints.PRESTATIONS}`,
            { params }
        );
    }

    createPrestation(prestationData: Omit<Prestation, '_id'>) {
        return this.httpClient.post<ApiResponse<any>>(
            `${env.baseUrl}/${Endpoints.PRESTATIONS}`,
           prestationData
        );
    }

    updatePrestation(id: string, data: { name: string, price: number }) {
        return this.httpClient.put<ApiResponse<Prestation>>(
            `${env.baseUrl}/${Endpoints.PRESTATIONS}/${id}`,
            data
        );
    }
}
