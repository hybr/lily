import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppDbCommon } from './common';
import { DbTableRecordsService } from './service';

const columns = [
    {field: 'web_domain', header: 'Web Domain'},
    {field: 'email_address', header: 'Email Address'}
];

class PersonName {
    prefix: string = '';
    first: string = '';
    middle: string = '';
    last: string = '';
    suffix: string = '';
}

class Record {
    public id: string;
    public web_domain: string = window.location.origin;
    public names: PersonName[] = [];
    public gender: string = '';
}

@Component({
    selector: 'app-db-person',
    templateUrl: './person.html'
})
export class DbPersonComponent extends AppDbCommon implements OnInit {
    private displayDialog: boolean = false;
    private record: Record = new Record();
    private selectedRecord: Record;
    private newRecord: boolean;
    private tableValues: Record[] = [];
    private recordForm: FormGroup;

    private dataLoaded: boolean = false;
    private errorMessage: string = '';
    private message: string = '';

    private subTitle = 'Person Details';
    private title = '';
    private summary = 'Personal profile for our website';
    private dbTableName = 'people';

    private genders = [];
   
    constructor(
        private dataService: DbTableRecordsService,
        private formBuilder: FormBuilder
    ) {
        super();     
    }

    ngOnInit() {
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


    getTableRecordsValue() {
        this.dataService.readTableRecordValues(this.dbTableName, '.*').subscribe(
            response => {
                if (response != undefined && response) { 
                    this.tableValues = response;
                }
                // console.log('getTableRecordsValue this.tableValues = ', this.tableValues);
                this.dataLoaded = true;
            },
            error =>  {
                this.errorMessage = error.json();
                this.dataLoaded = false;
            }
        );
        this.title = this.subTitle;
    }

    showDialogToAdd() {
        this.newRecord = true;
        this.record = new Record();
        if (this.selectedRecord) {
            this.title = 'Clone ' + this.subTitle;
        } else {
            this.title = 'Add ' + this.subTitle;
        }
        this.displayDialog = true;
    }
    
    save(modal: Record) {     
        /* save in db also */
              
        if(this.newRecord) {
            // console.log('save modal = ', modal);
            this.dataService.saveRecord(modal , this.dbTableName).subscribe(
                response => {
                    // console.log('save response = ', response);
                    // this.tableValues.push(modal); // add in local browser
                    this.message = 'Added new record';
                },
                error =>  {
                    this.errorMessage = error.json();
                    // console.log('this.errorMessage = ', this.errorMessage);
                }
            );        
        } else {           
            modal['_id'] = this.tableValues[this.getSelectedRecordIndex()]['_id'];
            modal['_etag'] = this.tableValues[this.getSelectedRecordIndex()]['_etag'];
            // console.log('update modal = ', modal);
            this.dataService.updateRecord(modal, this.dbTableName).subscribe(
                response => {
                    // console.log('update response = ', response);
                    // this.tableValues[this.getSelectedRecordIndex()] = modal; // update in local browser
                    this.message = 'Updated the record';
                },
                error =>  {
                    this.errorMessage = error.json();
                    // console.log('this.errorMessage = ', this.errorMessage);
                }
            );  
        }

        this.getTableRecordsValue();
        this.record = null;
        this.selectedRecord = null;
        this.displayDialog = false;
    }
    
    delete(modal: Record) {
        // console.log('delete modal = ', modal);

        let index = this.getSelectedRecordIndex();
        
        modal['_id'] = this.tableValues[this.getSelectedRecordIndex()]['_id'];
        modal['_etag'] = this.tableValues[this.getSelectedRecordIndex()]['_etag'];
        this.dataService.deleteRecord(modal, this.dbTableName).subscribe(
            response => {
                // console.log('delete response = ', response);
                this.tableValues = this.tableValues.filter((val,i) => i!=index);
                this.message = 'Deleted the record';            
            },
            error =>  {
                this.errorMessage = error.json();
                // console.log('this.errorMessage = ', this.errorMessage);
            }
        ); 

        this.getTableRecordsValue();
        this.record = null;
        this.selectedRecord = null;
        this.displayDialog = false;
    }    
    
    onRowSelect(event) {
        this.newRecord = false;
        this.record = this.cloneRecord(event.data);
        this.recordForm.reset({
            web_domain: this.record.web_domain,
            gender: this.record.gender,
        });
        this.recordForm = this.setSubRecord(
            this.recordForm, 
            'names', 
            this.record.names
        );
        this.title = 'Update ' + this.subTitle;
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