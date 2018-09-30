import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpModule,
         RequestOptions } from "@angular/http";
import { RouterModule } from "@angular/router";

import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { GrowlModule, ConfirmDialogModule, SharedModule } from "primeng/primeng";
import { ConfirmationService } from "primeng/components/common/confirmationservice";
import { MessageService } from "primeng/components/common/messageservice";
import * as lodash from "lodash";

import { primaryRoutes } from "./primary.routes";
import { AppComponent } from "../app.component";
import { NavigationComponent } from "../navigation.component";
import { DefaultRequestOptionsService } from "../../../services/api/general/default_request_options.service";
import { CardService } from "../../../services/api/card.service";
import { ENVIRONMENT_CONFIG, __ } from "./tokens";
import { environment } from "../../../../environments/environment";

import { AppStoreModule } from "../../../redux/store/app.store.module";
import { FooterComponent } from "../footer.component";
import { TarotReduxModule } from "../../../redux/tarot_redux.module";
import { SubscriptionCollectorService } from "../../../services/general/subscription_collector.service";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    GrowlModule,
    ConfirmDialogModule,
    SharedModule,
    RouterModule.forRoot(primaryRoutes),
    AppStoreModule,
    StoreDevtoolsModule.instrument({maxAge: 25}),
    TarotReduxModule
  ],
  providers: [
    { provide: ENVIRONMENT_CONFIG, useValue: environment },
    { provide: __, useValue: lodash },
    { provide: RequestOptions, useClass: DefaultRequestOptionsService },
    CardService,
    MessageService,
    ConfirmationService,
    SubscriptionCollectorService
  ],
  bootstrap: [ AppComponent ]
})
export class PrimaryModule { }
