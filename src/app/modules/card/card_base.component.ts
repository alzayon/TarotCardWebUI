import { Subscription } from 'rxjs/Subscription';
import { PrimaryEventBus } from "../primary/misc/primary_event_bus";
import { PrimaryEventType } from "../primary/misc/primary_event_type";

export abstract class CardBaseComponent {
    private bSubscriptions:Array<Subscription> = [];
    constructor(private bPrimaryEventBus:PrimaryEventBus) {

    }

    ngOnInit() {
        let subscription =
            this.bPrimaryEventBus.publish(PrimaryEventType.UPDATE_LAYOUT_VALUES, {
                "heading": "Cards"
            });
    }

    ngOnDestroy() {
        for(let s of this.bSubscriptions) {
            s.unsubscribe();
        }
    }
}