import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AppJwt } from '../../dto/app.jwt';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private token: string | null = null;
    private role: string | null = null;

    constructor() {
        this.loadToken();
    }

    private loadToken() {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            this.token = accessToken;
            const decodedToken: AppJwt = jwtDecode(accessToken);
            this.role = decodedToken.role;
        }
    }

    getToken(): string | null {
        return this.token;
    }

    getRole(): string | null {
        return this.role;
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }
}
