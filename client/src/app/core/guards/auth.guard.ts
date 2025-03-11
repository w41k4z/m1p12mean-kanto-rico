import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/auth/login']);
            return false;
        }
        const allowedRoles = route.data?.['roles'];
        const userRole = this.authService.getRole();
        if (allowedRoles && !allowedRoles.includes(userRole)) {
            this.router.navigate(['/auth/access']);
            return false;
        }
        return true;
    }
}
