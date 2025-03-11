import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { MydashboardComponent } from './demo/components/mydashboard/mydashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { Privileges } from './core/config/privileges';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'client',
                    loadChildren: () =>
                        import('./features/client/client.module').then(
                            (m) => m.ClientModule
                        ),
                    canActivate: [AuthGuard],
                    data: { roles: [Privileges.CLIENT] },
                },
                {
                    path: 'mechanic',
                    loadChildren: () =>
                        import('./features/mechanic/mechanic.module').then(
                            (m) => m.MechanicModule
                        ),
                    canActivate: [AuthGuard],
                    data: { roles: [Privileges.MECHANIC] },
                },
                {
                    path: 'manager',
                    loadChildren: () =>
                        import('./features/manager/manager.module').then(
                            (m) => m.ManagerModule
                        ),
                    canActivate: [AuthGuard],
                    data: { roles: [Privileges.MANAGER] },
                },
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import(
                                    './demo/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'uikit',
                            loadChildren: () =>
                                import(
                                    './demo/components/uikit/uikit.module'
                                ).then((m) => m.UikitModule),
                        },
                        {
                            path: 'utilities',
                            loadChildren: () =>
                                import(
                                    './demo/components/utilities/utilities.module'
                                ).then((m) => m.UtilitiesModule),
                        },
                        {
                            path: 'documentation',
                            loadChildren: () =>
                                import(
                                    './demo/components/documentation/documentation.module'
                                ).then((m) => m.DocumentationModule),
                        },
                        {
                            path: 'blocks',
                            loadChildren: () =>
                                import(
                                    './demo/components/primeblocks/primeblocks.module'
                                ).then((m) => m.PrimeBlocksModule),
                        },
                        {
                            path: 'pages',
                            loadChildren: () =>
                                import(
                                    './demo/components/pages/pages.module'
                                ).then((m) => m.PagesModule),
                        },
                        // New Update Template
                        {
                            path: 'mydashboard',
                            component: MydashboardComponent,
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./demo/components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                {
                    path: 'landing',
                    loadChildren: () =>
                        import('./demo/components/landing/landing.module').then(
                            (m) => m.LandingModule
                        ),
                },
                { path: 'pages/notfound', component: NotfoundComponent },
                { path: '**', redirectTo: 'pages/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
