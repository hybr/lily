import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppDbCommon } from './common';
import { DbTableRecordsService } from './service';


@Component({
    selector: 'app-db-user',
    template: `
        <p-dataTable [value]="tableValues" selectionMode="single" [(selection)]="selectedRecord" (onRowSelect)="onRowSelect($event)" [paginator]="true" rows="15" [responsive]="true" *ngIf="dataLoaded">
            <p-header>{{ subTitle }} <br /> {{summary}}</p-header>
            <p-column field="web_domain" header="Web Domain" [sortable]="true"></p-column>
            <p-column field="email_address" header="Email Address" [sortable]="true"></p-column>
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
                        [submitClicked]="submitted"
                        [fieldStructure]="getFieldStructure('email_address')"
                    ></form-input>
                    
                    <form-list 
                        [mainForm]="recordForm"
                        [submitClicked]="submitted"
                        [fieldStructure]="getFieldStructure('passwords')"
                    ></form-list>

                    <form-list 
                        [mainForm]="recordForm"
                        [submitClicked]="submitted"
                        [fieldStructure]="getFieldStructure('roles')"
                    ></form-list>

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
export class DbUserComponent extends AppDbCommon implements OnInit {

    private listOfRoles = [];

    constructor(
        public dataService: DbTableRecordsService
    ) {
        super(dataService);
    }

    ngOnInit() {
        this.subTitle = 'User Credentials';
        this.summary = 'User credentials to login';
        this.dbTableName = 'users';

        this.listOfRoles.push({label:'Admin', value:'admin'});
        this.listOfRoles.push({label:'Public', value:'public', selected:true});
        this.listOfRoles.push({label:'Customer', value:'customer'});
        this.listOfRoles.push({label:'Worker', value:'worker'});
        this.listOfRoles.push({label:'Supplier', value:'supplier'});

        this.addFieldStructureInRecordStructure('', 'email_address');
        this.addFieldStructureInRecordStructure('', 'passwords');
        this.addFieldStructureInRecordStructure('', 'roles', this.listOfRoles);
        this.createRecordForm();

        this.getTableRecordsValue();   
    }
    
    onRowSelect(event) {
        this.newRecord = false;
        this.recordForm.reset({
            web_domain: event.data.web_domain,
            email_address: event.data.email_address,
            passwords: event.data.passwords,
            roles: event.data.roles
        });
        this.title = 'Update ' + this.subTitle;
        this.displayDialog = true; 
    }

}