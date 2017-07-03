
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppFormCommon } from './common';

@Component({
	selector: 'form-list',
	template: `
    <div class="ui-grid-row lns_sub_fields_border">
        <div class="ui-grid-col-12">
            <div [formGroup]="mainForm">

                <label 
                    style="font-weight: bolder;"
                    [attr.for]="inputId"
                >{{pluralLabel}}</label>

                <div 
                    [formArrayName]="fieldControlName" 
                    [id]="inputId"
                >

                <p-panel *ngFor="let listItem of childrenOfControl; let itemIntex=index; ">
                    <p-header>
                        <div class="ui-helper-clearfix">
                            <span 
                                class="ui-panel-title" 
                                style="font-size:16px;display:inline-block;margin-top:2px"
                            >{{singularlLabel}} {{itemIntex + 1}}</span>

                            <span 
                                style="float:right"
                                *ngIf="hasItemsInList"
                                (click)="mainForm = removeControlFromGroup(
                                    mainForm, 
                                    fieldControlName, 
                                    itemIntex
                                )"
                            ><i class="fa fa-close"></i></span>
                        </div>
                    </p-header>

                    <input 
                        *ngIf="!hasOptions" 
                        pInputText 
                        [formControlName]="itemIntex"
                    />

                    <p-listbox 
                        *ngIf="hasOptions" 
                        [options]="selectOptions" 
                        [formControlName]="itemIntex"
                    ></p-listbox>

                    <validation-message 
                        [control]="validationControl"
                        [formSubmitted]="submitClicked"
                    ></validation-message>

                </p-panel>

            </div>

            <button 
                type="button" pButton 
                icon="fa-add" label="Add {{singularlLabel}}" 
                (click)="mainForm = addControlFromGroup(
                    mainForm, 
                    fieldControlName
                )"
            ></button>
            
        </div>
    </div>
	`
})
export class FormListComponent extends AppFormCommon {
  constructor() { super(); }
}
