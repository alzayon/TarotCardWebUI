import {
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy,
    ViewChildren,
    ElementRef
} from '@angular/core';

import {
    FormBuilder,
    FormGroup,
    FormControl,
    FormArray,
    Validators,
    FormControlName
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { EnumHelper } from '../../domain/helpers/enum_helper';
import { ValidationCollectorService } from '../../services/validators/validation_collector.service';
import { Spread } from '../../domain/model/spread';
import { RootState } from '../../redux/reducers/root.reducer';
import * as spreadActions from '../../redux/actions/spread.actions';
import { ISpreadFormState } from '../../redux/reducers/spread.reducer';
import { SubscriptionCollectorService } from '../../services/general/subscription_collector.service';

@Component({
    selector: 'spread-form',
    templateUrl: './views/spread_form.component.html',
    providers: [ValidationCollectorService]
})
export class SpreadFormComponent implements OnInit {

    readonly SUBSCRIPTION_KEY_SPREAD_FORM = 'SpreadForm';

    private mainFormGroup: FormGroup;
    private selectedCartType: string;
    private spreadTypesList: Array<any> = [];

    //Find all child components that are instances of FormControlName and 
    //obtain all references to their native dom element
    @ViewChildren(FormControlName, { read: ElementRef })
    private formInputElements: ElementRef[];

    // Use with the generic validation message class
    private errorMessagesFound: { [key: string]: string } = {};

    private validationMessages = {
        spreadName: {
            required: 'Spread name is required.'
        },
        spreadType: {
            required: 'Spread type is required.'
        }
    };

    private spread$: Observable<Spread>;

    constructor(private store: Store<RootState>,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private validationCollector: ValidationCollectorService,
        private subscriptionCollectorService: SubscriptionCollectorService) {
    }

    save(): void {
        let self = this;
        
        let formGroup = self.mainFormGroup;
        let formValues = formGroup.value;

        let formState: ISpreadFormState = {
            dirty: formGroup.dirty,
            valid: formGroup.valid,
            spreadName: formValues.spreadName
        };
        self.store.dispatch(new spreadActions.SetSpreadFormStateAction(formState));
    }

    ngOnInit(): void {
        let self = this;

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        self.validationCollector.setValidationMessages(this.validationMessages);

        self.mainFormGroup = self.fb.group({
            spreadName: ['', [Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)]]
        });

        self.spread$ = this.store.select(state => state.spreadState.currentSpread);
        let s1 = self.spread$.subscribe(spread => {
            self.mainFormGroup.reset();
            self.populateForm(spread);
        });

        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_SPREAD_FORM, s1);
    }

    ngAfterViewInit(): void {
        let self = this;

        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = self.formInputElements
            .map((formControl: ElementRef) =>
                Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        let s2 = Observable.merge(self.mainFormGroup.valueChanges, ...controlBlurs)
            .debounceTime(400).subscribe(value => {
                self.errorMessagesFound =
                    self.validationCollector.processMessages(self.mainFormGroup);
            });
         
        self.subscriptionCollectorService.addSubscription(self.SUBSCRIPTION_KEY_SPREAD_FORM, s2);     
    }

    private populateForm(spread: Spread) {
        // Update the data on the form
        this.mainFormGroup.patchValue({
            spreadName: spread.name
        });
    }

    ngOnDestroy(): void {
        let self = this;
        self.subscriptionCollectorService.unsubscribe(self.SUBSCRIPTION_KEY_SPREAD_FORM);
    }
}