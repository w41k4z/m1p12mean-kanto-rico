import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../service/app.layout.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private notificationService: NotificationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const userId = this.authService.getUserId();
        if (userId) {
            this.notificationService.registerClient(userId);
            this.notificationService.listenForNotifications();
        }
    }

    logOut() {
        this.authService.logOut(this.router);
    }

    userName() {
        return this.authService.getDisplayName();
    }
}
