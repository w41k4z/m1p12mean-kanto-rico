import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    declarations: [HomeComponent, UserListComponent],
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
