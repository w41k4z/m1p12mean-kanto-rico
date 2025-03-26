import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/core/config/endpoints';
import { ApiResponse } from 'src/app/core/dto/response/api.response';
import { ServiceListPayload } from 'src/app/core/dto/response/service/service.list.payload';
import { Service } from 'src/app/core/dto/service';
import { env } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ServService {
    constructor(private httpClient: HttpClient) { }

    getServices(page: number, size: number, filters: any) {
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
        return this.httpClient.get<ApiResponse<ServiceListPayload>>(
            `${env.baseUrl}/${Endpoints.SERVICES}`,
            { params }
        );
    }

    getServicesWithPrestations(page: number, size: number, filters: any) {
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
        return this.httpClient.get<ApiResponse<ServiceListPayload>>(
            `${env.baseUrl}/${Endpoints.SERVICES}/with-prestations`,
            { params }
        );
    }
    createService(name: string) {
        return this.httpClient.post<ApiResponse<any>>(
            `${env.baseUrl}/${Endpoints.SERVICES}`,
            { name }
        );
    }
    updateService(id: string, data: { name: string}) {
        return this.httpClient.put<ApiResponse<Service>>(
            `${env.baseUrl}/${Endpoints.SERVICES}/${id}`,
            data
        );
    }
}
