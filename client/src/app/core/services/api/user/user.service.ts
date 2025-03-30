import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/core/config/endpoints';
import { ApiResponse } from 'src/app/core/dto/response/api.response';
import { UserListPayload } from 'src/app/core/dto/response/user/user.list.payload';
import { env } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private httpClient: HttpClient) {}

    getUsers(page: number, size: number, filters: any) {
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
        return this.httpClient.get<ApiResponse<UserListPayload>>(
            `${env.baseUrl}/${Endpoints.USERS}`,
            { params }
        );
    }

    createUser(userObject: any) {
        return this.httpClient.post(
            `${env.baseUrl}/${Endpoints.ACCOUNTS}/create/${userObject.role}`,
            userObject
        );
    }
}
