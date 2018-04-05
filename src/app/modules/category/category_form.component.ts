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
import { Category } from '../../domain/model/category';
import { RootState } from '../../redux/reducers/root.reducer';
import * as categoryActions from '../../redux/actions/category.actions';
import { ICategoryFormState } from '../../redux/reducers/category.reducer';
import { SubscriptionCollectorService } from '../../services/general/subscription_collector.service';

@Component({
    selector: 'category-form',
    templateUrl: './views/category_form.component.html',
    providers: [ValidationCollectorService]
})
export class CategoryFormComponent implements OnInit {

    private mainFormGroup: FormGroup;
    private selectedCartType: string;
    private categoryTypesList: Array<any> = [];

    //Find all child components that are instances of FormControlName and 
    //obtain all references to their native dom element
    @ViewChildren(FormControlName, { read: ElementRef })
    private formInputElements: ElementRef[];

    // Use with the generic validation message class
    private errorMessagesFound: { [key: string]: string } = {};

    private validationMessages = {
        categoryName: {
            required: 'Category name is required.'
        },
        categoryType: {
            required: 'Category type is required.'
        }
    };

    private category$: Observable<Category>;

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

        let formState: ICategoryFormState = {
            dirty: formGroup.dirty,
            valid: formGroup.valid,
            categoryName: formValues.categoryName,
            categoryType: formValues.categoryType
        };
        self.store.dispatch(new categoryActions.SetCategoryFormStateAction(formState));
    }

    ngOnInit(): void {
        let self = this;

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        self.validationCollector.setValidationMessages(this.validationMessages);

        self.mainFormGroup = self.fb.group({
            categoryName: ['', [Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)]]
        });

        self.category$ = this.store.select(state => state.categoryState.currentCategory);
        let s1 = self.category$.subscribe(category => {
            self.mainFormGroup.reset();
            self.populateForm(category);
        });

        self.subscriptionCollectorService.addSubscription('CategoryForm', s1);
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
        
        this.subscriptionCollectorService.addSubscription('CategoryForm', s2);
    }

    private populateForm(category: Category) {
        // Update the data on the form
        this.mainFormGroup.patchValue({
            categoryName: category.name
        });
    }

    ngOnDestroy(): void {
        let self = this;
        self.subscriptionCollectorService.unsubscribe('CategoryForm');
    }
}