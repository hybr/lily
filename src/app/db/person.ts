import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppDbCommon } from './common';
import { DbTableRecordsService } from './service';
import { SelectItem } from 'primeng/primeng';

interface Phone {
    web_domain;
    phone_number;
    use;
    other_use;
}

@Component({
    selector: 'app-db-person',
    templateUrl: './person.html'
})
export class DbPersonComponent extends AppDbCommon implements OnInit {

    private genders = [];
    private phoneNumberRecords: SelectItem[];
   
     constructor(
        public dataService: DbTableRecordsService,
        public formBuilder: FormBuilder
    ) {
        super(formBuilder, dataService);
    }

    ngOnInit() {
        this.subTitle = 'Person Details';
        this.summary = 'Personal profile for our website';
        this.dbTableName = 'people';

        this.genders.push({label:'Female', value:'female'});
        this.genders.push({label:'Male', value:'male', selected:true});
        this.genders.push({label:'Other', value:'other'});

        this.recordForm = new FormGroup({
            web_domain: new FormControl('', [Validators.required]),
            names: new FormArray(
                [this.initName()],   Validators.minLength(1)
            ),
            gender: new FormControl('', []),

            phone_numbers: new FormArray(
                [this.initPhone()]
            )
        });

        this.getSpecificTableRecordsValue('phones', ['phone_number', 'use', 'other_use']);
        this.phoneNumberRecords = this.specificTableValues;

        console.log('this.specificTableValues = ', this.specificTableValues);
        console.log('this.phoneNumberRecords = ', this.phoneNumberRecords);
        this.getTableRecordsValue();
        
    }
    
    onRowSelect(event) {
        this.newRecord = false;
        this.title = 'Update ' + this.subTitle;
        this.displayDialog = true; 

        this.recordForm.reset({
            web_domain: event.data.web_domain,
            gender: event.data.gender
        });

        this.recordForm = this.setSubRecord(
            this.recordForm, 
            'names', 
            event.data.names
        );

        this.recordForm = this.setSubRecord(
            this.recordForm, 
            'phone_numbers', 
            event.data.phone_numbers
        ); 
    }

    initName() {
        return new FormGroup({
            prefix: new FormControl('', [Validators.pattern('^[a-zA-Z.]+$')]),
            first: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z.]+$')]),
            middle: new FormControl('', [Validators.pattern('^[a-zA-Z.]+$')]),
            last: new FormControl('', [Validators.pattern('^[a-zA-Z.]+$')]),
            suffix: new FormControl('', [Validators.pattern('^[a-zA-Z.]+$')])
        });
    }

    initPhone() {
        return new FormControl('', []);
    }
}