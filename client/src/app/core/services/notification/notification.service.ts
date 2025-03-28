import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { env } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private socket: Socket;

    constructor() {
        this.socket = io(env.baseUrl);
    }

    registerClient(clientId: string) {
        this.socket.emit('register', clientId);
    }

    listenForNotifications() {
        this.socket.on('notification', (data) => {
            console.log(data);
        });
    }
}
