import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ClientRoutingModule } from './client-routing.module';
import { TokenTransactionComponent } from './components/token-transaction/token-transaction.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
    declarations: [HomeComponent, TokenTransactionComponent],
    imports: [
        CommonModule,
        FormsModule,
        ClientRoutingModule,
        TableModule,
        CalendarModule,
        ToolbarModule,
        ButtonModule,
        RippleModule,
    ],
})
export class ClientModule {}
