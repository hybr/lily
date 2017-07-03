import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppDbCommon } from './common';
import { DbTableRecordsService } from './service';

@Component({
    selector: 'app-db-phone',
    template: `
        <p-dataTable [value]="tableValues" selectionMode="single" [(selection)]="selectedRecord" (onRowSelect)="onRowSelect($event)" [paginator]="true" rows="15" [responsive]="true" *ngIf="dataLoaded">
            <p-header>{{ subTitle }} <br /> {{summary}}</p-header>
            <p-column field="web_domain" header="Web Domain" [sortable]="true"></p-column>
            <p-column field="phone_number" header="Phone Number" [sortable]="true"></p-column>
            <p-column field="use" header="Use" [sortable]="true">
                <ng-template let-col let-use="rowData.use" pTemplate="body">
                    <ul><li *ngFor="let u of use">
                        {{ getLabel(usages, 'value', u) }}
                    </li></ul>
                </ng-template>
            </p-column>
            <p-column field="other_use" header="Other Use" [sortable]="true"></p-column>
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

                    <form-input 
                        [mainForm]="recordForm"
                        [fieldStructure]="getFieldStructure('phone_number')"
                        [submitClicked]="submitted"
                    ></form-input>

                    <form-list 
                        [mainForm]="recordForm"
                        [submitClicked]="submitted"
                        [fieldStructure]="getFieldStructure('use')"
                    ></form-list>

                   <form-input  *ngIf="doesValueExists('other', recordForm.controls.use.value)"
                        [mainForm]="recordForm"
                        [fieldStructure]="getFieldStructure('other_use')"
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
export class DbPhoneComponent extends AppDbCommon implements OnInit {

    private usages = [];
    
    constructor(
        public dataService: DbTableRecordsService
    ) {
        super(dataService);
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

        this.addFieldStructureInRecordStructure('', 'phone_number');
        this.addFieldStructureInRecordStructure('', 'use', this.usages);
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