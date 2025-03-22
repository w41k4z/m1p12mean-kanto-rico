import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MechanicRoutingModule } from './mechanic-routing.module';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, MechanicRoutingModule],
})
export class MechanicModule {}
