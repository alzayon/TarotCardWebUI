import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { readingRoutes } from "./reading.routes";

import { ReadingAddComponent } from "../reading_add.component";
import { ReadingEditComponent } from "../reading_edit.component";
import { ReadingListComponent } from "../reading_list.component";
import { ReadingViewComponent } from "../reading_view.component";
import { ReadingFormComponent } from "../reading_form.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(readingRoutes)
  ],
  declarations: [
    ReadingAddComponent,
    ReadingEditComponent,
    ReadingListComponent,
    ReadingViewComponent,
    ReadingFormComponent
  ],
  providers: [

  ]
})
export class ReadingModule { };