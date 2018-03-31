import { NgModule } from '@angular/core';

import { CardService } from '../services/api/card.service';
import { CategoryService } from '../services/api/category.service';

@NgModule({
    providers: [
        CardService,
        CategoryService
      ]
})
export class TarotReduxModule { }
