import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { ServiceListComponent } from './components/service-list/service-list.component';
import { PrestationListComponent } from './components/prestation-list/prestation-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';
@NgModule({
    declarations: [HomeComponent, UserListComponent, ServiceListComponent,PrestationListComponent,TaskListComponent],
    imports: [
        CommonModule,
        ManagerRoutingModule,
        TableModule,
        FormsModule,
        ToolbarModule,
        ButtonModule,
        RippleModule,
        DialogModule,
        InputTextModule,
    ],
})
export class ManagerModule {}
