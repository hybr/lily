import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppDbCommon } from './common';
import { DbTableRecordsService } from './service';

const columns = [
    {field: 'web_domain', header: 'Web Domain'},
    {field: 'email_address', header: 'Email Address'}
];

class Record {
    _id
    web_domain: string = window.location.origin;
    email_address: string = '';
    passwords: string[] = [];
}

class Password {
    password: string = '';
}


@Component({
    selector: 'app-db-user',
    templateUrl: './user.html'
})
export class DbUserComponent extends AppDbCommon implements OnInit {
    private displayDialog: boolean = false;
    private record: Record = new Record();
    private selectedRecord: Record;
    private newRecord: boolean;
    private tableValues: Record[] = [];
    private recordForm: FormGroup;

    private dataLoaded: boolean = false;
    private errorMessage: string = '';
    private message: string = '';

    private title = 'User Credentials';
    private summary = 'User credentials to login';
    private dbTableName = 'users';



    constructor(
        private dataService: DbTableRecordsService,
        private formBuilder: FormBuilder
    ) {
        super();     
    }

    ngOnInit() {
        this.recordForm = this.formBuilder.group({

            web_domain: ['', [Validators.required]],
            email_address: ['', [Validators.required, Validators.email]],
            passwords: this.formBuilder.array([
                this.initPassword(),
            ])
        });
        this.getTableRecordsValue();   
    }


    getTableRecordsValue() {
        this.dataService.readTableRecordValues(this.dbTableName, '.*').subscribe(
            response => {
                if (response != undefined && response) { 
                    this.tableValues = response;
                }
                console.log('getTableRecordsValue this.tableValues = ', this.tableValues);
                this.dataLoaded = true;
            },
            error =>  {
                this.errorMessage = <any>error;
                this.dataLoaded = false;
            }
        );
    }

    showDialogToAdd() {
        this.newRecord = true;
        this.record = new Record();
        this.displayDialog = true;
    }
    
    save(modal: Record) {     
        /* save in db also */
        
        let tableValues = [...this.tableValues];
        
        if(this.newRecord) {
            console.log('save modal = ', modal);
            this.dataService.saveRecord(modal , this.dbTableName).subscribe(
                response => {
                    console.log('save response = ', response);
                    tableValues.push(modal); // add in local browser
                    this.message = 'Added new record';
                },
                error =>  {
                    this.errorMessage = error.json()['_issues'];
                }
            );        
        } else {           
            modal['_id'] = this.tableValues[this.getSelectedRecordIndex()]['_id'];
            modal['_etag'] = this.tableValues[this.getSelectedRecordIndex()]['_etag'];
            console.log('update modal = ', modal);
            this.dataService.updateRecord(modal, this.dbTableName).subscribe(
                response => {
                    console.log('update response = ', response);
                    tableValues[this.getSelectedRecordIndex()] = modal; // update in local browser
                    this.message = 'Updated new record';
                },
                error =>  {
                    this.errorMessage = error.json()['_issues'];
                }
            );  
        }
        
        this.tableValues = tableValues;    

        this.record = null;
        this.selectedRecord = null;
        this.displayDialog = false;
    }
    
    delete(modal: Record) {
        let index = this.getSelectedRecordIndex();
        

        this.dataService.deleteRecord('_id', this.tableValues[index]['_id'], this.dbTableName).subscribe(
            response => {
                console.log('delete response = ', response);
                this.tableValues = this.tableValues.filter((val,i) => i!=index);              
            },
            error =>  {
                this.errorMessage = error.json()['_issues'];
            }
        );       
        this.record = null;
        this.selectedRecord = null;
        this.displayDialog = false;
    }    
    
    onRowSelect(event) {
        this.newRecord = false;
        this.record = this.cloneRecord(event.data);
        this.recordForm.reset({
            web_domain: this.record.web_domain,
            email_address: this.record.email_address,
            passwords: this.record.passwords
        });
        this.displayDialog = true; 
    }
    
    cloneRecord(r: Record): Record {
        let rec = new Record();
        for(let prop in r) {
            rec[prop] = r[prop];
        }
        return rec;
    }
    
    getSelectedRecordIndex(): number {
        return this.tableValues.indexOf(this.selectedRecord);
    }

    /* ------------- */

    initPassword() {
        return new FormControl('', [Validators.required, Validators.minLength(8)]);
    } 

    addPassword() {
        const control = <FormArray>this.recordForm.controls['passwords'];
        control.push(new FormControl('', [Validators.required, Validators.minLength(8)]));
    }

    removePassword(i: number) {
        const control = <FormArray>this.recordForm.controls['passwords'];
        control.removeAt(i);
    }
}