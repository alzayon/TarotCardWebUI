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
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { CardType } from '../../domain/enums/card_type';
import { EnumHelper } from '../../domain/helpers/enum_helper';
import { ValidationCollectorService } from '../../services/validators/validation_collector.service';
import { Card } from '../../domain/model/card';
import { RootState } from '../../redux/reducers/root.reducer';
import * as cardActions from '../../redux/actions/card.actions';
import { ICardFormState } from '../../redux/reducers/card.reducer';
import { SubscriptionCollectorService } from '../../services/general/subscription_collector.service';

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

    private card$: Observable<Card>;

    constructor(private store: Store<RootState>,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private validationCollector:ValidationCollectorService,
        private subscriptionCollectorService: SubscriptionCollectorService) {            
        }
    
    save(): void {
        let self = this;
        
        let formGroup = self.mainFormGroup;
        let formValues = formGroup.value;
        
        let formState: ICardFormState = {
            dirty: formGroup.dirty,
            valid: formGroup.valid,
            cardName: formValues.cardName,
            cardType: formValues.cardType
        };
        self.store.dispatch(new cardActions.SetCardFormStateAction(formState));        
    }

    ngOnInit(): void {
        let self = this;
        self.cardTypesList = EnumHelper.toList(CardType)
                                .map((obj) => {
                                    return { label : obj, value : obj };
                                });
        
        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        self.validationCollector.setValidationMessages(this.validationMessages);                        

        self.mainFormGroup = self.fb.group({
            cardName: ['', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(50)]],
            cardType: [CardType.MAJOR_ARCANA, [Validators.required]]                   
        });

        self.card$ = this.store.select(state => state.cardState.currentCard);
        let s1 = self.card$.subscribe(card => {
            self.mainFormGroup.reset();
            self.populateForm(card);
        });            

        self.subscriptionCollectorService.addSubscription('CardForm', s1);
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => 
                Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        let s2 = Observable.merge(this.mainFormGroup.valueChanges, ...controlBlurs)
                  .debounceTime(400).subscribe(value => {
                        this.errorMessagesFound = 
                            this.validationCollector.processMessages(this.mainFormGroup);
        });

        this.subscriptionCollectorService.addSubscription('CardForm', s2);
    }

    private populateForm(card:Card) {
        // Update the data on the form
        this.mainFormGroup.patchValue({
            cardName: card.name,
            cardType: CardType[card.type]
        });
    }

    ngOnDestroy(): void {
        let self = this;
        self.subscriptionCollectorService.unsubscribe('CardForm');
    }
}