import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { env } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../../config/endpoints';
import { ApiResponse } from '../../dto/response/api.response';
import { NotificationListPayload } from '../../dto/response/notification/notification.list.payload';
import { Notification } from '../../dto/notification';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private socket: Socket;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.socket = io(env.baseUrl);
    }

    registerClient() {
        this.socket.emit('register', this.authService.getUserId());
    }

    listenForNotifications(callback: (data: Notification) => void) {
        this.socket.on('notification', (notification) => {
            callback(notification);
        });
    }

    loadNotifications() {
        return this.http.get<ApiResponse<NotificationListPayload>>(
            `${env.baseUrl}/${Endpoints.NOTIFICATIONS}`
        );
    }

    markAsRead() {
        return this.http.post(
            `${env.baseUrl}/${Endpoints.NOTIFICATIONS}/read`,
            {}
        );
    }
}
