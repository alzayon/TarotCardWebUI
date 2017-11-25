import { Component,
    OnInit, 
    AfterViewInit,
    OnDestroy  } from '@angular/core';   
import { Subscription } from 'rxjs/Subscription';
import { PrimaryEventBus } from './misc/primary_event_bus';
import { PrimaryEventType } from './misc/primary_event_type';

@Component({
  selector: 'app-root',
  templateUrl: './views/app.component.html',
  providers: [ PrimaryEventBus ]
})
export class AppComponent {

    private subscriptions:Array<Subscription> = [];
    private heading:String = "Heading";

    constructor(private primaryEventBus: PrimaryEventBus) { }

    ngOnInit() {
        let self = this;
        let subscription = 
            this.primaryEventBus.eventObservable
                    .subscribe((v) => {
                        let eventType = v.value1;
                        switch(eventType) {
                            case PrimaryEventType.UPDATE_LAYOUT_VALUES:
                                let values = v.value2;                         
                                if (values.heading) {
                                    self.heading = values.heading;
                                }                       
                        }  
            });

        this.subscriptions.push(subscription);    
    }

    ngOnDestroy(): void {
        for(let s of this.subscriptions) {
            s.unsubscribe();
        }
    }
}