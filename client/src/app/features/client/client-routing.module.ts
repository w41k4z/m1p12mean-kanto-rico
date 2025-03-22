import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppLayoutComponent } from 'src/app/layout/app.layout.component';
import { TokenTransactionComponent } from './components/token-transaction/token-transaction.component';
import { ServiceListComponent } from './components/service-list/service-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppLayoutComponent,
                children: [
                    {
                        path: '',
                        component: HomeComponent,
                    },
                    {
                        path: 'token-transactions',
                        component: TokenTransactionComponent,
                    },
                    {
                        path: 'services',
                        component: ServiceListComponent,
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ClientRoutingModule {}
