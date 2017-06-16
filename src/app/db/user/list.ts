import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AppDbCommon } from '../common';
import { DbTableRecordsService } from '../service';
import { dbTableName, Record, Password, formTitle, formSummary } from './record';
import { DataTableModule, SharedModule } from 'primeng/primeng';

@Component({
	selector: 'app-db-user-list',
	templateUrl: './list.html'
})
export class DbUserListComponent extends AppDbCommon implements OnInit {
    
    private tableValues: Record[] = [];
    private dataLoaded: boolean = false;
    private errorMessage: string = '';

    constructor(
        private dataService: DbTableRecordsService,
    ) {
        super();
    }

    ngOnInit() {
        this.getTableRecordsValue();
    }

    getTableRecordsValue() {
        this.dataService.updateTableRecords(dbTableName, '.*').subscribe(
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

}