import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTableModule, SharedModule } from "primeng/primeng";

import { spreadRoutes } from "./spread.routes";

import { SpreadAddComponent } from "../spread_add.component";
import { SpreadEditComponent } from "../spread_edit.component";
import { SpreadListComponent } from "../spread_list.component";
import { SpreadViewComponent } from "../spread_view.component";
import { SpreadFormComponent } from "../spread_form.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(spreadRoutes),
    DataTableModule,
    SharedModule,
  ],
  declarations: [
    SpreadAddComponent,
    SpreadEditComponent,
    SpreadFormComponent,
    SpreadListComponent,
    SpreadViewComponent,
  ],
})
export class SpreadModule { }
