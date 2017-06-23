import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppDbCommon } from './common';
import { DbTableRecordsService } from './service';

@Component({
    selector: 'app-db-person',
    templateUrl: './person.html'
})
export class DbPersonComponent extends AppDbCommon implements OnInit {

    private genders = [];
   
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
        this.genders.push({label:'Male', value:'male'});
        this.genders.push({label:'Other', value:'other'});

        this.recordForm = this.formBuilder.group({
            web_domain: ['', [Validators.required]],
            names: this.formBuilder.array([
                this.initName(),
            ]),
            gender: ['', []]
        });
        this.getTableRecordsValue();   
    }
    
    onRowSelect(event) {
        this.newRecord = false;
        this.title = 'Update ' + this.subTitle;
        this.displayDialog = true; 

        this.recordForm.reset({
            web_domain: event.data.web_domain,
            gender: event.data.gender,
        });
        
        this.recordForm = this.setSubRecord(
            this.recordForm, 
            'names', 
            event.data.names
        );
        
    }
    
    
    /* ------------- */

    initName() {
        return this.formBuilder.group({
            prefix: ['', [Validators.pattern('^[a-zA-Z.]+$')]],
            first: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
            middle: ['', [Validators.pattern('^[a-zA-Z]+$')]],
            last: ['', [Validators.pattern('^[a-zA-Z]+$')]],
            suffix: ['', [Validators.pattern('^[a-zA-Z.]+$')]]
        });
    } 


}