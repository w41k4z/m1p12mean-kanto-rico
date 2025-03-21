import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from 'src/app/layout/app.layout.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { PrestationListComponent } from './components/prestation-list/prestation-list.component';

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
                        path: 'users',
                        component: UserListComponent,
                    },
                    {
                        path: 'services',
                        component: ServiceListComponent,
                    },
                    {
                        path: 'prestations',
                        component: PrestationListComponent,
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ManagerRoutingModule {}
