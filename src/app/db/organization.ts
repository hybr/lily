import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppDbCommon } from './common';
import { DbTableRecordsService } from './service';

@Component({
    selector: 'app-db-organization',
    template: `
        <p-dataTable [value]="tableValues" selectionMode="single" [(selection)]="selectedRecord" (onRowSelect)="onRowSelect($event)" [paginator]="true" rows="15" [responsive]="true" *ngIf="dataLoaded">
            <p-header>{{ subTitle }} <br /> {{summary}}</p-header>
            
            <p-column field="web_domain" header="Web Domain" [sortable]="true"></p-column>

            <p-column field="abbreviation" header="Abbreviation" [sortable]="true"></p-column>
                      
            <p-column field="name" header="Name" [sortable]="true"></p-column>
            
            <p-footer>
                <div class="ui-helper-clearfix" style="width:100%">
                    <button *ngIf="!selectedRecord" type="button" pButton icon="fa-plus" style="float:left" (click)="showDialogToAdd()" label="Add"></button>
                    <button *ngIf="selectedRecord" type="button" pButton icon="fa-plus" style="float:left" (click)="showDialogToAdd()" label="Clone"></button>            
                </div>
            </p-footer>
        </p-dataTable>

        <validation-api-message 
            [errorMessage]="apiErrorMessage" 
            [goodMessage]="apiGoodMessage"
        ></validation-api-message>

        <p-dialog header="{{title}}" [(visible)]="displayDialog" [responsive]="true" showEffect="fade" [modal]="true" [responsive]="true" [contentStyle]="{'overflow':'auto','max-height':'500px'}">

            <form [formGroup]="recordForm" novalidate (ngSubmit)="save(recordForm.value)">

                <div class="ui-grid ui-grid-responsive ui-fluid">

                    <form-input 
                        [mainForm]="recordForm"
                        [submitClicked]="submitted"
                        [fieldStructure]="getFieldStructure('abbreviation')"
                    ></form-input>

                    <form-input 
                        [mainForm]="recordForm"
                        [fieldStructure]="getFieldStructure('name')"
                        [submitClicked]="submitted"
                    ></form-input>

                   <form-input
                        [mainForm]="recordForm"
                        [fieldStructure]="getFieldStructure('statement')"
                        [submitClicked]="submitted"
                    ></form-input>

                </div>

                <p-footer>
                    <div class="ui-dialog-buttonpane ui-helper-clearfix">

                        <button type="button" pButton icon="fa-check" 
                            (click)="submitted=true;" label="Check"
                        ></button>

                        <button type="button" pButton icon="fa-remove" 
                            (click)="delete(recordForm.value)" label="Delete"
                        ></button>

                        <button type="submit" pButton icon="fa-save" 
                            label="Save" [disabled]="!recordForm.valid"
                        ></button>

                    </div>
                </p-footer>

            </form>

        </p-dialog>    
    `
})
export class DbOrganizationComponent extends AppDbCommon implements OnInit {
    
    constructor(
        public dataService: DbTableRecordsService
    ) {
        super(dataService);
    }

    ngOnInit() {
        this.subTitle = 'Organization';
        this.summary = 'Detail of organization';
        this.dbTableName = 'organizations';


        this.addFieldStructureInRecordStructure('string', 'abbreviation', [], 'Abbreviations', 'Abbreviation');
        this.addFieldStructureInRecordStructure('string', 'name', [], 'Names', 'Name');
        this.addFieldStructureInRecordStructure('string', 'statement', [], 'Statements', 'Statement');
        this.createRecordForm();
        
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