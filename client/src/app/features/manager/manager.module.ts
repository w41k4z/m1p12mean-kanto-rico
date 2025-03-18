import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { TableModule } from 'primeng/table';
import { ServiceListComponent } from './components/service-list/service-list.component';

@NgModule({
    declarations: [HomeComponent, UserListComponent, ServiceListComponent],
    imports: [CommonModule, ManagerRoutingModule, TableModule],
})
export class ManagerModule {}
