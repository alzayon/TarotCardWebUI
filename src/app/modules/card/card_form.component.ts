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

import { CardType } from '../../domain/enums/card_type';
import { EnumToList } from '../../domain/helpers/enum_to_list';

@Component({
    selector: 'card-form',
    templateUrl: './views/card_form.component.html' 
})
export class CardFormComponent implements OnInit {
    

    mainFormGroup: FormGroup;
    selectedCartType: string;
    cardTypesList:Array<any> = [];

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute) {

        }
    
    save(): void {
        console.log("saving entity...");
    }

    ngOnInit(): void {
        this.cardTypesList = EnumToList.toList(CardType)
                                .map((obj) => {
                                    return { label : obj, value : obj };
                                });

        this.mainFormGroup = this.fb.group({
            cardName: ['', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(50)]],
            cardType: [CardType.MAJOR_ARCANA, [Validators.required]]                   
        });
    }
}