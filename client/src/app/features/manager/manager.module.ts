import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { TableModule } from 'primeng/table';

@NgModule({
    declarations: [HomeComponent, UserListComponent],
    imports: [CommonModule, ManagerRoutingModule, TableModule],
})
export class ManagerModule {}
