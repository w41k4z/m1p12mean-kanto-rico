import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ClientRoutingModule } from './client-routing.module';
import { TokenTransactionComponent } from './components/token-transaction/token-transaction.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';

registerLocaleData(localeFr, 'fr');

@NgModule({
    declarations: [
        HomeComponent,
        TokenTransactionComponent,
        ServiceListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ClientRoutingModule,
        TableModule,
        CalendarModule,
        ToolbarModule,
        ButtonModule,
        RippleModule,
        CardModule,
        MultiSelectModule,
        DialogModule,
        InputTextModule,
        PaginatorModule,
    ],
})
export class ClientModule {}
