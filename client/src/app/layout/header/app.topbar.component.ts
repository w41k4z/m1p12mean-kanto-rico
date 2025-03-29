import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from '../service/app.layout.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { Notification } from 'src/app/core/dto/notification';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [MessageService],
})
export class AppTopBarComponent {
    items!: MenuItem[];
    notifications: Notification[] = [];
    unreadCount: number = 0;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    @ViewChild('notificationPanel') notificationPanel!: OverlayPanel;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private notificationService: NotificationService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.notificationService.registerClient();
        this.notificationService.listenForNotifications((newNotification) => {
            this.notifications.push(newNotification);
            this.unreadCount = this.notifications.filter((n) => !n.read).length;
            this.messageService.add({
                severity: 'info',
                summary: 'Nouvelle Notification',
                detail: newNotification.message,
                life: 5000,
            });
        });
        this.notificationService.loadNotifications().subscribe((res) => {
            if (res.payload) {
                this.notifications = res.payload.notifications;
                this.unreadCount = res.payload.notifications.filter(
                    (n) => !n.read
                ).length;
            }
        });
    }

    showNotifications(event: Event) {
        this.notificationPanel.toggle(event);

        if (this.unreadCount > 0) {
            this.notificationService.markAsRead().subscribe((res) => {
                this.unreadCount = 0;
                this.notifications = this.notifications.map((n) => ({
                    ...n,
                    read: true,
                }));
            });
        }
    }

    logOut() {
        this.authService.logOut(this.router);
    }

    userName() {
        return this.authService.getDisplayName();
    }
}
