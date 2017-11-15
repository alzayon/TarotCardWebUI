import { Component, 
         OnInit, 
         AfterViewInit, 
         OnDestroy, 
         ViewChildren, 
         ElementRef } from '@angular/core';

import { FormBuilder, 
         FormGroup, 
         FormControl, 
         FormArray, 
         Validators, 
         FormControlName } from '@angular/forms';

import { ActivatedRoute, Router  } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { CardType } from '../../domain/enums/card_type';
import { EnumHelper } from '../../domain/helpers/enum_helper';
import { CardEventBus } from './misc/card_event_bus';
import { CardEventType } from './misc/card_event_type';
import { ValidationCollectorService } from '../../services/validators/validation_collector.service';

@Component({
    selector: 'card-form',
    templateUrl: './views/card_form.component.html',
    providers: [ ValidationCollectorService ] 
})
export class CardFormComponent implements OnInit {
    
    private mainFormGroup: FormGroup;
    private selectedCartType: string;
    private cardTypesList:Array<any> = [];

    //Find all child components that are instances of FormControlName and 
    //obtain all references to their native dom element
    @ViewChildren(FormControlName, { read: ElementRef }) 
    private formInputElements: ElementRef[];

    // Use with the generic validation message class
    private errorMessagesFound: { [key: string]: string } = {};

    private validationMessages = {
        cardName: {
            required: 'Card name is required.'
        },
        cardType: {
            required: 'Card type is required.'
        }
    };

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private cardEventBus:CardEventBus,
        private validationCollector:ValidationCollectorService) {
        }
    
    save(): void {
        let self = this;
        let formValues = self.mainFormGroup.value;
        this.cardEventBus.publish(CardEventType.BEGIN_SAVE, 
            { "formValues" : formValues,
              "dirty": self.mainFormGroup.dirty,
              "valid" : self.mainFormGroup.valid
            });
    }

    ngOnInit(): void {
        this.cardTypesList = EnumHelper.toList(CardType)
                                .map((obj) => {
                                    return { label : obj, value : obj };
                                });
        
        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.validationCollector.setValidationMessages(this.validationMessages);                        

        this.mainFormGroup = this.fb.group({
            cardName: ['', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(50)]],
            cardType: [CardType.MAJOR_ARCANA, [Validators.required]]                   
        });
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => 
                Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.mainFormGroup.valueChanges, ...controlBlurs)
                  .debounceTime(400).subscribe(value => {
                        this.errorMessagesFound = 
                            this.validationCollector.processMessages(this.mainFormGroup);
        });
    }

   
}