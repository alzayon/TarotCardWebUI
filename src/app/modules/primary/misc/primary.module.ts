import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,
         RequestOptions } from '@angular/http';
import { InputTextModule, ButtonModule, DataTableModule, DialogModule }  from 'primeng/primeng';
import { RouterModule } from '@angular/router'

import * as lodash from 'lodash';

import { primaryRoutes } from './primary.routes';
import { AppComponent } from '../app.component';
import { NavigationComponent } from '../navigation.component';
import { DefaultRequestOptionsService } from '../../../services/api/general/default_request_options.service';
import { CardService } from '../../../services/api/card.service';
import { ENVIRONMENT_CONFIG, __ } from './tokens';
import { environment } from '../../../../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DataTableModule,
    HttpModule,
    InputTextModule, 
    DialogModule,
    ButtonModule,

    RouterModule.forRoot(primaryRoutes)
  ],
  providers: [
    { provide: ENVIRONMENT_CONFIG, useValue: environment },
    { provide: __, useValue: lodash },
    { provide: RequestOptions, useClass: DefaultRequestOptionsService },
    CardService
  ],
  bootstrap: [AppComponent]
})
export class PrimaryModule { }
