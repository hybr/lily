import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppDbCommon } from './common';
import { DbTableRecordsService } from './service';

@Component({
    selector: 'app-db-se_operation_data',
    template: `
        <p-dataTable [value]="tableValues" selectionMode="single" [(selection)]="selectedRecord" (onRowSelect)="onRowSelect($event)" [paginator]="true" rows="15" [responsive]="true" *ngIf="dataLoaded">
            <p-header>{{ subTitle }} <br /> {{summary}}</p-header>
            
            <p-column field="web_domain" header="Web Domain" [sortable]="true"></p-column>
            <p-column field="on" header="Time" [sortable]="true"></p-column>
            <p-column field="cma" header="Controller MAC Address" [sortable]="true"></p-column>
            <p-column field="mcma" header="Micro Controller MAC Address" [sortable]="true"></p-column>
            <p-column field="sn" header="Sensor Number" [sortable]="true"></p-column>
            <p-column field="r" header="Reading" [sortable]="true"></p-column>
            <p-column field="u" header="Unit" [sortable]="true"></p-column>
            
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
                        [fieldStructure]="getFieldStructure('web_domain')"
                    ></form-input>

                    <form-datetime 
                        [mainForm]="recordForm"
                        [submitClicked]="submitted"
                        [fieldStructure]="getFieldStructure('on')"
                    ></form-datetime>

                    <form-input 
                        [mainForm]="recordForm"
                        [fieldStructure]="getFieldStructure('cma')"
                        [submitClicked]="submitted"
                    ></form-input>

                   <form-input
                        [mainForm]="recordForm"
                        [fieldStructure]="getFieldStructure('mcma')"
                        [submitClicked]="submitted"
                    ></form-input>

                   <form-input
                        [mainForm]="recordForm"
                        [fieldStructure]="getFieldStructure('sn')"
                        [submitClicked]="submitted"
                    ></form-input>

                    <form-input
                        [mainForm]="recordForm"
                        [fieldStructure]="getFieldStructure('r')"
                        [submitClicked]="submitted"
                    ></form-input>

                    <form-input
                        [mainForm]="recordForm"
                        [fieldStructure]="getFieldStructure('u')"
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
export class DbSeOperationDataComponent extends AppDbCommon implements OnInit {
    
    constructor(
        public dataService: DbTableRecordsService
    ) {
        super(dataService);
    }

    ngOnInit() {
        this.subTitle = 'Operation Data';
        this.summary = 'Operation Data for save energy';
        this.dbTableName = 'se_operation_data';
        this.addFieldStructureInRecordStructure(
            'string', 'on', 
            [Validators.required], 
            'Event Times', 'Event Time'
        );
        this.addFieldStructureInRecordStructure(
            'string', 'cma', 
            [Validators.required], 
            'Controller MAC Addresses', 'Controller MAC Address'
        );
        this.addFieldStructureInRecordStructure(
            'string', 'mcma', 
            [Validators.required], 
            'Micro Controller MAC Addresss', 'Micro Controller MAC Address'
        );
        this.addFieldStructureInRecordStructure(
            'string', 'sn', 
            [Validators.required], 
            'Sensor Numbers', 'Sensor Number'
        );
        this.addFieldStructureInRecordStructure(
            'string', 'r', 
            [Validators.required], 
            'Readings', 'Reading'
        );
        this.addFieldStructureInRecordStructure(
            'string', 'u', 
            [Validators.required], 
            'Reading Units', 'Reading Unit'
        );
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