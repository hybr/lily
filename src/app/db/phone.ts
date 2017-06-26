import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppDbCommon } from './common';
import { DbTableRecordsService } from './service';

@Component({
    selector: 'app-db-phone',
    templateUrl: './phone.html'
})
export class DbPhoneComponent extends AppDbCommon implements OnInit {

    private usages = [];
    
    constructor(
        public dataService: DbTableRecordsService,
        public formBuilder: FormBuilder
    ) {
        super(formBuilder, dataService);
    }

    ngOnInit() {
        this.subTitle = 'Phone Number';
        this.summary = 'Phone number used by person or organization';
        this.dbTableName = 'phones';

        this.usages.push({label:'For Home', value:'for home'});
        this.usages.push({label:'For Work', value:'for work', selected: true});
        this.usages.push({label:'By Madam', value:'by madam'});
        this.usages.push({label:'By Sir', value:'by sir'});
        this.usages.push({label:'Of Landline', value:'of landline'});
        this.usages.push({label:'Of Mobile', value:'of mobile'});
        this.usages.push({label:'As Primary', value:'as primary'});
        this.usages.push({label:'On Contact us Webpage', value:'on contact us webpage'});
        this.usages.push({label:'Other', value:'other'});

        this.recordForm = this.formBuilder.group({
            web_domain: ['', [Validators.required]],
            phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10,13}$')]],
            use: [[], [Validators.required]],
            other_use: ['', [Validators.pattern('^[0-9a-zA-Z ]{3,15}$')]]
        });

        this.getTableRecordsValue();   
    }
    
    onRowSelect(event) {
        this.newRecord = false;
        this.recordForm.reset({
            web_domain: event.data.web_domain,
            phone_number: event.data.phone_number,
            use: event.data.use,
            other_use: event.data.other_use
        });
        this.title = 'Update ' + this.subTitle;
        this.displayDialog = true; 
    }

}