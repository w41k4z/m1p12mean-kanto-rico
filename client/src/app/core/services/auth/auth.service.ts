import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AppJwt } from '../../dto/app.jwt';
import { AuthRequest } from '../../dto/request/auth/auth.request';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../../config/endpoints';
import { env } from 'src/environments/environment';
import { ApiResponse } from '../../dto/response/api.response';
import { AuthResponse } from '../../dto/response/auth/auth.response';
import { Router } from '@angular/router';
import { Privileges } from '../../config/privileges';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private token: string | null = null;
    private role: string | null = null;
    private displayName: string | null = null;

    constructor(private httpClient: HttpClient) {
        this.loadSession();
    }

    private loadSession(token?: string) {
        const accessToken = token ? token : localStorage.getItem('accessToken');
        if (accessToken) {
            this.token = accessToken;
            const decodedToken: AppJwt = jwtDecode(accessToken);
            this.role = decodedToken.role;
            this.displayName = decodedToken.displayName;
        }
    }

    getToken(): string | null {
        return this.token;
    }

    getRole(): string | null {
        return this.role;
    }

    getDisplayName(): string | null {
        return this.displayName;
    }

    isAuthenticated(): boolean {
        return !!this.token && !!this.role;
    }

    authenticate(username: string, password: string) {
        const authRequest = new AuthRequest(username, password);
        return this.httpClient.post<ApiResponse<AuthResponse>>(
            `${env.baseUrl}/${Endpoints.SIGN_IN}`,
            authRequest
        );
    }

    saveSession(accessToken: string) {
        localStorage.setItem('accessToken', accessToken);
        this.loadSession(accessToken);
    }

    redirectToHomePage(router: Router) {
        if (!this.isAuthenticated()) {
            router.navigate(['/auth/login']);
            return;
        }
        switch (this.role) {
            case Privileges.CLIENT:
                router.navigate(['/client']);
                break;
            case Privileges.MECHANIC:
                router.navigate(['/mechanic']);
                break;
            case Privileges.MANAGER:
                router.navigate(['/manager']);
                break;
            default:
                router.navigate(['/auth/access']);
                break;
        }
    }

    logOut(router: Router) {
        this.token = null;
        this.role = null;
        this.displayName = null;
        localStorage.removeItem('accessToken');
        router.navigate(['/auth/login']);
    }
}
