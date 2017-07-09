import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppDbCommon } from './common';
import { DbTableRecordsService } from './service';
import { SelectItem } from 'primeng/primeng';

interface Phone {
    web_domain;
    phone_number;
    use;
    other_use;
}

@Component({
    selector: 'app-db-web_page',
    template: `
        <p-dataTable [value]="tableValues" selectionMode="single" [(selection)]="selectedRecord" (onRowSelect)="onRowSelect($event)" [paginator]="true" rows="15" [responsive]="true" *ngIf="dataLoaded">
            <p-header>{{ subTitle }} <br /> {{summary}}</p-header>

            <p-column field="web_domain" header="Web Domain" [sortable]="true"></p-column>
            
            <p-column field="sections" header="Names" [sortable]="true">
                <ng-template let-col let-sections="rowData.sections" pTemplate="body">
                    <ul><li *ngFor="let section of sections">
                        {{ section.type }}
                    </li></ul>
                </ng-template>
            </p-column>
            
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

        <p-dialog header="{{title}}" [(visible)]="displayDialog" [responsive]="true" showEffect="fade" [modal]="true" [responsive]="true" [contentStyle]="{'overflow':'auto','max-height':'500px'}" >

            <form [formGroup]="recordForm" novalidate (ngSubmit)="save(recordForm.value)">

                <div class="ui-grid ui-grid-responsive ui-fluid">

                    <form-input 
                        [mainForm]="recordForm"
                        [submitClicked]="submitted"
                        [fieldStructure]="getFieldStructure('web_domain')"
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

                    <form-input 
                        [mainForm]="recordForm"
                        [submitClicked]="submitted"
                        [fieldStructure]="getFieldStructure('key_words')"
                    ></form-input>

                    <form-input 
                        [mainForm]="recordForm"
                        [submitClicked]="submitted"
                        [fieldStructure]="getFieldStructure('title')"
                    ></form-input>


                    <div class="ui-grid-row lns_sub_fields_border">
                        <div class="ui-grid-col-12">

                            <label for="sections_id" style="font-weight: bolder;">Sections *</label>

                            <div formArrayName="sections" id="sections_id">

                                <p-panel *ngFor=" let section of recordForm.controls.sections.controls; let sectionsIndex=index; ">

                                <p-header>
                                    <div class="ui-helper-clearfix">
                                        <span class="ui-panel-title" style="font-size:16px;display:inline-block;margin-top:2px">Section {{sectionsIndex + 1}}</span>
                                        
                                        <span 
                                            style="float:right"
                                            *ngIf="recordForm.controls.sections.controls.length > 1"
                                            (click)="recordForm.get('sections').removeAt(sectionsIndex)"
                                        ><i class="fa fa-close"></i></span>
                                    </div>
                                </p-header>
                                    
                                    <div [formGroupName]="sectionsIndex" >

                                        <div class="ui-grid-row lns_sub_fields_border">
                                            <div class="ui-grid-col-12"> 

                                                <label for="type_id" style="font-weight: bolder;">Type</label>
                                                <input pInputText id="type_id" formControlName="type" />
                                                 <validation-message 
                                                    [control]="recordForm.controls.sections"
                                                ></validation-message>

                                            </div>
                                        </div>
                                        
                                    </div>

                                </p-panel>
                                
                            </div>

                            <button type="button" pButton icon="fa-add" label="Add Name" (click)="recordForm = addControlFromGroup(recordForm, 'sections', initSection())"></button>

                        </div>
                    </div> 

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
export class DbWebPagesComponent extends AppDbCommon implements OnInit {

    private usages = [];
    private sectionTypes = [];
   
     constructor(
        public dataService: DbTableRecordsService
    ) {
        super(dataService);
    }

    ngOnInit() {
        this.subTitle = 'Web Page Details';
        this.summary = 'All web pages for the punblic website';
        this.dbTableName = 'web_pages';

        this.usages.push({label:'For Home Page', value:'for home page'});
        this.usages.push({label:'For About us Page', value:'for about us page', selected: true});
        this.usages.push({label:'Other', value:'other'});

        this.sectionTypes.push({label:'Paragraph', value:'paragraph', selected: true});
        this.sectionTypes.push({label:'Slider', value:'slider'});
        
        this.addFieldStructureInRecordStructure('', 'use', this.usages);
        this.addFieldStructureInRecordStructure(
            'string', 'key_words', 
            [Validators.required], 
            'Key Words', 'Key Word'
        );
        this.addFieldStructureInRecordStructure(
            'string', 'title', 
            [Validators.required], 
            'Titles', 'Title'
        );      
        this.createRecordForm();


        this.recordForm = new FormGroup({
            sections: new FormArray(
                [this.initSection()], Validators.compose([Validators.minLength(1)])
            ),
        });

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
            'sections', 
            event.data.sections
        );

        this.recordForm['sections'] = this.setSubRecord(
            this.recordForm['sections'], 
            'slides', 
            event.data.sections.slides
        ); 
    }

    initSection() {
        return new FormGroup({
            type: new FormControl('', [Validators.pattern('^[a-zA-Z.]+$')]),
            paragraph: new FormControl(''),
            slides: new FormArray(
                [this.initStringNoValidatorsControl()],  Validators.compose([Validators.minLength(1)])
            ),
        });
    }

}