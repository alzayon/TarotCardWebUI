import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Pair } from '../../../general/pair';
import { CardEventType } from '../misc/card_event_type';


@Injectable()
export class CardEventBus {    
    
    private _subject:Subject<Pair<CardEventType, any>> = new Subject<Pair<CardEventType, any>>();
    readonly eventObservable: Observable<Pair<CardEventType, any>> = this._subject;
    
    constructor() {
    }

    publish(type:CardEventType, value:any) {
        this._subject.next(new Pair(type,value));
    }
}