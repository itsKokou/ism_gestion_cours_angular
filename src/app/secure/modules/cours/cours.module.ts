import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursRoutingModule } from './cours-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { Select2Module } from 'ng-select2-component';


@NgModule({
  declarations: [],
  imports: [CommonModule, CoursRoutingModule, Select2Module],
})
export class CoursModule {}
