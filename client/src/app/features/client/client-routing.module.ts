import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppLayoutComponent } from 'src/app/layout/app.layout.component';
import { TokenTransactionComponent } from './components/token-transaction/token-transaction.component';

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
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ClientRoutingModule {}
