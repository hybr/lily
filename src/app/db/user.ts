import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppDbCommon } from './common';
import { DbTableRecordsService } from './service';


@Component({
    selector: 'app-db-user',
    templateUrl: './user.html'
})
export class DbUserComponent extends AppDbCommon implements OnInit {


    constructor(
        public dataService: DbTableRecordsService
    ) {
        super(dataService);
    }

    ngOnInit() {
        this.subTitle = 'User Credentials';
        this.summary = 'User credentials to login';
        this.dbTableName = 'users';

        this.recordForm = new FormGroup({
            web_domain: new FormControl('', [Validators.required]),
            email_address: new FormControl('', [Validators.required, Validators.email]),
            passwords: new FormArray([
                this.initPassword()
            ])
        });
        this.getTableRecordsValue();   
    }
    
    onRowSelect(event) {
        this.newRecord = false;
        this.recordForm.reset({
            web_domain: event.data.web_domain,
            email_address: event.data.email_address,
            passwords: event.data.passwords
        });
        this.title = 'Update ' + this.subTitle;
        this.displayDialog = true; 
    }

    initPassword() {
        return new FormControl('', [Validators.required, Validators.minLength(8)]);
    } 


}