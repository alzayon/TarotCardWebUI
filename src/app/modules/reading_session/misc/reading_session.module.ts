import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { readingSessionRoutes } from "./reading_session.routes";

import { ReadingSessionAddComponent } from "../reading_session_add.component";
import { ReadingSessionEditComponent } from "../reading_session_edit.component";
import { ReadingSessionListComponent } from "../reading_session_list.component";
import { ReadingSessionViewComponent } from "../reading_session_view.component";
import { ReadingSessionFormComponent } from "../reading_session_form.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(readingSessionRoutes)
  ],
  declarations: [
    ReadingSessionAddComponent,
    ReadingSessionEditComponent,
    ReadingSessionListComponent,
    ReadingSessionViewComponent,
    ReadingSessionFormComponent
  ],
  providers: [

  ]
})
export class ReadingSessionModule { };