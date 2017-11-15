import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Pair } from '../../../common/pair';
import { PrimaryEventType } from '../misc/primary_event_type';


@Injectable()
export class PrimaryEventBus {    
    
    private _subject:Subject<Pair<PrimaryEventType, any>> = new Subject<Pair<PrimaryEventType, any>>();
    readonly eventObservable: Observable<Pair<PrimaryEventType, any>> = this._subject;
    
    constructor() {
    }

    publish(type:PrimaryEventType, value:any) {
        this._subject.next(new Pair(type,value));
    }
}