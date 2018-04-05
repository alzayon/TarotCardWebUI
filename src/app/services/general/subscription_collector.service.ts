import { Subscription } from "rxjs/Subscription";

export class SubscriptionCollectorService {
    private subscriptionsMap = new Map<string, Array<Subscription>>();

    constructor() {
    }

    public addSubscription(keyName: string, subscription: Subscription) {
        if (!this.subscriptionsMap.has(keyName)) {
            this.subscriptionsMap.set(keyName, []);            
        } 
        let list = this.subscriptionsMap.get(keyName);
        list.push(subscription);        
    }

    public unsubscribeAll() {
        this.subscriptionsMap.forEach((list, k) => {
            list.map( it => {
                if (!it.closed) {
                    it.unsubscribe();
                }                
            });
        });
    }

    public unsubscribe(keyName: string) {
        if (this.subscriptionsMap.has(keyName)) {
            let list = this.subscriptionsMap.get(keyName);
            list.map( it => {
                if (!it.closed) {
                    it.unsubscribe();
                }   
            });
        }
    }
}