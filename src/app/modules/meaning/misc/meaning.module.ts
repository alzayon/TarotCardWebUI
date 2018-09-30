import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { meaningRoutes } from "./meaning.routes";

import { MeaningAddComponent } from "../meaning_add.component";
import { MeaningEditComponent } from "../meaning_edit.component";
import { MeaningListComponent } from "../meaning_list.component";
import { MeaningViewComponent } from "../meaning_view.component";
import { MeaningFormComponent } from "../meaning_form.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(meaningRoutes)
  ],
  declarations: [
    MeaningAddComponent,
    MeaningEditComponent,
    MeaningListComponent,
    MeaningViewComponent,
    MeaningFormComponent
  ],
  providers: [

  ]
})
export class MeaningModule { };