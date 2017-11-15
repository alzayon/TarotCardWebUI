import { Component,
    OnInit, 
    AfterViewInit,
    OnDestroy  } from '@angular/core';   
import { Subscription } from 'rxjs/Subscription';

import { Car } from '../../domain/car';
import { CarService} from '../../services/api/carservice';
import { PrimaryEventBus } from './misc/primary_event_bus';
import { PrimaryEventType } from './misc/primary_event_type';

@Component({
  selector: 'app-root',
  templateUrl: './views/app.component.html',
  providers: [ CarService,
    PrimaryEventBus ]
})
export class AppComponent {
    
    displayDialog: boolean;

    car: Car = new PrimeCar();
    
    selectedCar: Car;
    
    newCar: boolean;

    cars: Car[];

    private subscriptions:Array<Subscription> = [];
    private heading:String = "Heading";

    constructor(private carService: CarService,
                private primaryEventBus: PrimaryEventBus) { }

    ngOnInit() {
        let self = this;
        this.carService.getCarsSmall().then(cars => this.cars = cars);
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
    
    showDialogToAdd() {
        this.newCar = true;
        this.car = new PrimeCar();
        this.displayDialog = true;
    }
    
    save() {
        let cars = [...this.cars];
        if(this.newCar)
            cars.push(this.car);
        else
            cars[this.findSelectedCarIndex()] = this.car;
        
        this.cars = cars;
        this.car = null;
        this.displayDialog = false;
    }
    
    delete() {
        let index = this.findSelectedCarIndex();
        this.cars = this.cars.filter((val,i) => i!=index);
        this.car = null;
        this.displayDialog = false;
    }    
    
    onRowSelect(event) {
        this.newCar = false;
        this.car = this.cloneCar(event.data);
        this.displayDialog = true;
    }
    
    cloneCar(c: Car): Car {
        let car = new PrimeCar();
        for(let prop in c) {
            car[prop] = c[prop];
        }
        return car;
    }
    
    findSelectedCarIndex(): number {
        return this.cars.indexOf(this.selectedCar);
    }
}

export class PrimeCar implements Car {
    
    constructor(public vin?, public year?, public brand?, public color?) {}
}
