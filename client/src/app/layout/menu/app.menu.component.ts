import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Privileges } from 'src/app/core/config/privileges';
import { AuthService } from 'src/app/core/services/auth/auth.service';

import templateMenuItems from './items/template.menu.items';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.loadMenuItems();
    }

    async loadMenuItems() {
        const role = this.authService.getRole();
        switch (role) {
            case Privileges.MANAGER:
                this.model = (
                    await import('./items/manager.menu.items')
                ).default;
                break;
            case Privileges.MECHANIC:
                this.model = (
                    await import('./items/mechanic.menu.items')
                ).default;
                break;
            case Privileges.CLIENT:
                this.model = (
                    await import('./items/client.menu.items')
                ).default;
                break;
            default:
                this.model = templateMenuItems;
                break;
        }
    }
}
