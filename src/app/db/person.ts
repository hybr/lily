import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppDbCommon } from './common';
import { DbTableRecordsService } from './service';
import { SelectItem } from 'primeng/primeng';

@Component({
    selector: 'app-db-person',
    template: `
        <p-dataTable [value]="tableValues" selectionMode="single" [(selection)]="selectedRecord" (onRowSelect)="onRowSelect($event)" [paginator]="true" rows="15" [responsive]="true" *ngIf="dataLoaded">
            <p-header>{{ subTitle }} <br /> {{summary}}</p-header>

            <p-column field="web_domain" header="Web Domain" [sortable]="true"></p-column>
            
            <p-column field="names" header="Names" [sortable]="true">
                <ng-template let-col let-names="rowData.names" pTemplate="body">
                    <ul><li *ngFor="let name of names">
                        {{ name.prefix }} {{ name.first }} {{ name.middle }} {{ name.last }} {{ name.suffix }}
                    </li></ul>
                </ng-template>
            </p-column>
            
            <p-column field="gender" header="Gender" [sortable]="true">
                <ng-template let-col let-g="rowData.gender" pTemplate="body">
                    {{ getLabel(genders, 'value', g) }}
                </ng-template>    
                
            </p-column>
            
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

        <p-dialog header="{{title}}" [(visible)]="displayDialog" [responsive]="true" showEffect="fade" [modal]="true" [responsive]="true" [contentStyle]="{'overflow':'auto','max-height':'500px'}" >

            <form [formGroup]="recordForm" novalidate (ngSubmit)="save(recordForm.value)">

                <div class="ui-grid ui-grid-responsive ui-fluid">

                    <form-input 
                        [mainForm]="recordForm"
                        [submitClicked]="submitted"
                        [fieldStructure]="getFieldStructure('web_domain')"
                    ></form-input>

                    <div class="ui-grid-row lns_sub_fields_border">
                        <div class="ui-grid-col-12">

                            <label for="names_id" style="font-weight: bolder;">Names *</label>

                            <div formArrayName="names" id="names_id">

                                <p-panel *ngFor=" let name of recordForm.controls.names.controls; let namesIndex=index; ">

                                <p-header>
                                    <div class="ui-helper-clearfix">
                                        <span class="ui-panel-title" style="font-size:16px;display:inline-block;margin-top:2px">Name {{namesIndex + 1}}</span>
                                        
                                        <span 
                                            style="float:right"
                                            *ngIf="recordForm.controls.names.controls.length > 1"
                                            (click)="recordForm.get('names').removeAt(namesIndex)"
                                        ><i class="fa fa-close"></i></span>
                                    </div>
                                </p-header>
                                    
                                    <div [formGroupName]="namesIndex" >

                                        <div class="ui-grid-row lns_sub_fields_border">
                                            <div class="ui-grid-col-12"> 

                                                <label for="prefix_id" style="font-weight: bolder;">Prefix</label>
                                                <input pInputText id="prefix_id" formControlName="prefix" />


                                                <div class="ui-message ui-messages-error ui-corner-all" 
                                                    *ngIf="recordForm.controls.names.controls[namesIndex].controls.prefix.errors 
                                                    &&  recordForm.controls.names.controls[namesIndex].controls.prefix.errors.pattern"
                                                >
                                                    Prefix format is not correct
                                                </div>

                                            </div>
                                        </div>
                                    
                                        <div class="ui-grid-row lns_sub_fields_border">
                                            <div class="ui-grid-col-12">
                                                <label for="first_id" style="font-weight: bolder;">First *</label>
                                                <input pInputText id="first_id" formControlName="first" />
                                                
                                                <div class="ui-message ui-messages-error ui-corner-all" 
                                                    *ngIf="recordForm.controls.names.controls[namesIndex].controls.first.errors 
                                                    && recordForm.controls.names.controls[namesIndex].controls.first.errors.required"
                                                >
                                                    First name is required
                                                </div>

                                                 <div class="ui-message ui-messages-error ui-corner-all" 
                                                    *ngIf="recordForm.controls.names.controls[namesIndex].controls.first.errors 
                                                    && recordForm.controls.names.controls[namesIndex].controls.first.errors.pattern"
                                                >
                                                    First name format is not correct
                                                </div>
                           
                                            </div>
                                        </div>
                                    
                                        <div class="ui-grid-row lns_sub_fields_border">
                                            <div class="ui-grid-col-12">                            
                                                <label for="middle_id" style="font-weight: bolder;">Middle</label>
                                                <input pInputText id="middle_id" formControlName="middle" />

                                                <div class="ui-message ui-messages-error ui-corner-all" 
                                                    *ngIf="recordForm.controls.names.controls[namesIndex].controls.middle.errors 
                                                    && recordForm.controls.names.controls[namesIndex].controls.middle.errors.pattern"
                                                >
                                                    Middle name format is not correct
                                                </div>

                                            </div>
                                        </div>
                                    
                                        <div class="ui-grid-row lns_sub_fields_border">
                                            <div class="ui-grid-col-12">
                                                <label for="last_id" style="font-weight: bolder;">Last</label>
                                                <input pInputText id="last_id" formControlName="last" />


                                                <div class="ui-message ui-messages-error ui-corner-all" 
                                                    *ngIf="recordForm.controls.names.controls[namesIndex].controls.last.errors 
                                                    && recordForm.controls.names.controls[namesIndex].controls.last.errors.pattern"
                                                >
                                                    Last name format is not correct
                                                </div>

                                            </div>
                                        </div>

                                        <div class="ui-grid-row lns_sub_fields_border">
                                            <div class="ui-grid-col-12">
                                                <label for="suffix_id" style="font-weight: bolder;">Suffix</label>
                                                <input pInputText id="suffix_id" formControlName="suffix" />

                                                <div class="ui-message ui-messages-error ui-corner-all" 
                                                    *ngIf="recordForm.controls.names.controls[namesIndex].controls.suffix.errors 
                                                    && recordForm.controls.names.controls[namesIndex].controls.suffix.errors.pattern"
                                                >
                                                    Suffix format is not correct
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                </p-panel>
                                
                            </div>

                            <button type="button" pButton icon="fa-add" label="Add Name" (click)="recordForm = addControlFromGroup(recordForm, 'names', initName())"></button>

                        </div>
                    </div> 

                    <div class="ui-grid-row lns_sub_fields_border">
                        <div class="ui-grid-col-12">
                            <label for="gender_id" style="font-weight: bolder;">Gender</label>
                            <p-listbox [options]="genders" id="gender_id"  formControlName="gender" ></p-listbox>
                        </div>
                    </div>

                    <form-list 
                        [mainForm]="recordForm"
                        [submitClicked]="submitted"
                        [fieldStructure]="getFieldStructure('phone_numbers')"
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
export class DbPersonComponent extends AppDbCommon implements OnInit {

    private genders = [];
    private phoneNumberRecords: SelectItem[] = [];
   
     constructor(
        public dataService: DbTableRecordsService
    ) {
        super(dataService);
    }

    ngOnInit() {
        this.subTitle = 'Person Details';
        this.summary = 'Personal profile for our website';
        this.dbTableName = 'people';

        this.genders.push({label:'Female', value:'female'});
        this.genders.push({label:'Male', value:'male', selected:true});
        this.genders.push({label:'Other', value:'other'});

        this.recordStructure.push({ 
            'name' : 'names',
            'label' : 'Phone Numbers',
            'sub_field_defination' : this.initName(),
            'field_defination': new FormArray(
                [this.initName()], 
                Validators.compose([Validators.minLength(1)])
            ),
        });
        this.addFieldStructureInRecordStructure('', 'gender', this.genders);
        this.getSpecificTableRecordsValue('phones', ['phone_number', 'use', 'other_use']);
        this.phoneNumberRecords = this.specificTableValues;
        this.addFieldStructureInRecordStructure(
            'required_list_of_strings', 
            'phone_numbers', this.phoneNumberRecords,
            'Phone Numbers','Phone Number'
        );
        this.createRecordForm();
        this.getTableRecordsValue();
    }
    
    onRowSelect(event) {
        this.newRecord = false;
        this.title = 'Update ' + this.subTitle;
        this.displayDialog = true; 

        this.recordForm.reset({
            web_domain: event.data.web_domain,
            gender: event.data.gender
        });

        this.recordForm = this.setSubRecord(
            this.recordForm, 
            'names', 
            event.data.names
        );

        this.recordForm = this.setSubRecord(
            this.recordForm, 
            'phone_numbers', 
            event.data.phone_numbers
        ); 
    }

    initName() {
        return new FormGroup({
            prefix: new FormControl('', [Validators.required]),
            first: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z.]+$')]),
            middle: new FormControl('', [Validators.pattern('^[a-zA-Z.]+$')]),
            last: new FormControl('', [Validators.pattern('^[a-zA-Z.]+$')]),
            suffix: new FormControl('', [Validators.pattern('^[a-zA-Z.]+$')])
        });
    }
}