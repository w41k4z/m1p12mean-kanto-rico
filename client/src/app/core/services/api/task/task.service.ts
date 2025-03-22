import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/core/config/endpoints';
import { ApiResponse } from 'src/app/core/dto/response/api.response';
import { TaskListPayload } from 'src/app/core/dto/response/task/task.list.payload';
import { env } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
})
export class TaskService {
    constructor(private httpClient: HttpClient) { }
    getTasks(page: number, size: number, filters: any) {
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
        return this.httpClient.get<ApiResponse<TaskListPayload>>(
            `${env.baseUrl}/${Endpoints.TASKS}`,
            { params }
        );
    }
}