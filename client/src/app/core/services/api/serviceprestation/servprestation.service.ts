import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Endpoints } from "src/app/core/config/endpoints";
import { ApiResponse } from "src/app/core/dto/response/api.response";
import { ServicePrestationListPayload } from "src/app/core/dto/response/serviceprestation/serviceprestation.list.payload";
import { env } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})

export class ServPrestationService {
    constructor(private httpClient: HttpClient) { }

    getServicesPrestation(page: number, size: number, filters: any) {
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
        return this.httpClient.get<ApiResponse<ServicePrestationListPayload>>(
            `${env.baseUrl}/${Endpoints.SERVICES_PRESTATIONS}`,
            { params }
        );
    }

    createServicePrestation(name: string) {
        return this.httpClient.post<ApiResponse<any>>(
            `${env.baseUrl}/${Endpoints.SERVICES_PRESTATIONS}`,
            { name }
        );
    }

    updateServicePrestation(id: string, data: { name: string }) {
        return this.httpClient.put<ApiResponse<ServicePrestationListPayload>>(
            `${env.baseUrl}/${Endpoints.SERVICES_PRESTATIONS}/${id}`,
            data
        );
    }

    deleteServicePrestation(id: string) {
        return this.httpClient.delete<ApiResponse<void>>(
            `${env.baseUrl}/${Endpoints.SERVICES_PRESTATIONS}/${id}`
        );
    }



    getPrestationsByService(serviceName: string) {
        if (!serviceName) {
            throw new Error('Service name is required');
        }
        const encodedName = encodeURIComponent(serviceName);
        return this.httpClient.get<ApiResponse<any>>(
            `${env.baseUrl}/${Endpoints.SERVICES_PRESTATIONS}/${encodedName}`
        );
    }
}