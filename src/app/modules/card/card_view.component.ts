import { Component } from '@angular/core';
import { CardBaseComponent } from './card_base.component';
import { PrimaryEventBus } from '../primary/misc/primary_event_bus';

@Component({
    selector: 'card-view',
    templateUrl: './views/card_view.component.html' 
})
export class CardViewComponent extends CardBaseComponent {
    constructor(private primaryEventBus:PrimaryEventBus) {
        super(primaryEventBus); 
    }
}