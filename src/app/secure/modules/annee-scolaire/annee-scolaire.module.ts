import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnneeScolaireRoutingModule } from './annee-scolaire-routing.module';
import { RouterLink } from '@angular/router';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AnneeScolaireRoutingModule
  ]
})
export class AnneeScolaireModule { }
