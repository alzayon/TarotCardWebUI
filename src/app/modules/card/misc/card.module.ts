import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, 
         ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';

import { cardRoutes } from './card.routes';

import { CardAddComponent } from '../card_add.component';
import { CardEditComponent } from '../card_edit.component';
import { CardListComponent } from '../card_list.component';
import { CardViewComponent } from '../card_view.component';
import { CardFormComponent } from '../card_form.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(cardRoutes),
    DropdownModule,
    DataTableModule,
    SharedModule
  ],
  declarations: [
    CardAddComponent,
    CardEditComponent,
    CardListComponent,
    CardViewComponent,
    CardFormComponent    
  ],
  providers: [
  ]
})
export class CardModule { };