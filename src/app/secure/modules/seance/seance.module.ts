import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeanceRoutingModule } from './seance-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SeanceRoutingModule
  ]
})
export class SeanceModule { }
