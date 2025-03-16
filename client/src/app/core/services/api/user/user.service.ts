import { HttpClient } from '@angular/common/http';
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

    getUsers() {
        return this.httpClient.get<ApiResponse<UserListPayload>>(
            `${env.baseUrl}/${Endpoints.USERS}`
        );
    }
}
