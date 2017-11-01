import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { spreadComponentRoutes } from './spread_component.routes';

import { SpreadComponentAddComponent } from '../spread_component_add.component';
import { SpreadComponentEditComponent } from '../spread_component_edit.component';
import { SpreadComponentListComponent } from '../spread_component_list.component';
import { SpreadComponentViewComponent } from '../spread_component_view.component';
import { SpreadComponentFormComponent } from '../spread_component_form.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(spreadComponentRoutes)
  ],
  declarations: [
    SpreadComponentAddComponent,
    SpreadComponentEditComponent,
    SpreadComponentListComponent,
    SpreadComponentViewComponent,
    SpreadComponentFormComponent
  ],
  providers: [

  ]
})
export class SpreadComponentModule { };