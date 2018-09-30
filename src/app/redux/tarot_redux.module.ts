import { NgModule } from "@angular/core";

import { CardService } from "../services/api/card.service";
import { CategoryService } from "../services/api/category.service";
import { SpreadService } from "../services/api/spread.service";

@NgModule({
    providers: [
        CardService,
        CategoryService,
        SpreadService
      ]
})
export class TarotReduxModule { }
