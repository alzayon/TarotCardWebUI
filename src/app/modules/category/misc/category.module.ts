import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTableModule, SharedModule } from "primeng/primeng";

import { categoryRoutes } from "./category.routes";

import { CategoryAddComponent } from "../category_add.component";
import { CategoryEditComponent } from "../category_edit.component";
import { CategoryListComponent } from "../category_list.component";
import { CategoryViewComponent } from "../category_view.component";
import { CategoryFormComponent } from "../category_form.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(categoryRoutes),
    DataTableModule,
    SharedModule
  ],
  declarations: [
    CategoryAddComponent,
    CategoryEditComponent,
    CategoryListComponent,
    CategoryViewComponent,
    CategoryFormComponent
  ],
  providers: [

  ]
})
export class CategoryModule { };