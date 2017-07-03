import { Component } from '@angular/core';
import { AppCommon } from '../common';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { DbTableRecordsService } from './service';
import { SelectItem } from 'primeng/primeng';

@Component({
    selector: 'app-db-common',
    template: ''
})
export class AppDbCommon extends AppCommon {
    public tableOfTables: string = 't1';
    public tableNumberRecordName: string = 'f2';
    public keysOfFieldProperties: string[] = [];

    public displayDialog: boolean = false;    
    public newRecord: boolean;
    public dataLoaded: boolean = false;
    public apiErrorMessage: string = '';
    public apiGoodMessage: string = '';

    public subTitle = '';
    public title = '';
    public summary = '';
    public dbTableName = '';

    public selectedRecord = null;
    public tableValues = [];
    public recordForm: FormGroup;
    public recordStructure: Object[] = [];
    public specificTableValues: SelectItem[] = [];
    public submitted: boolean = false;

    constructor(
        public dataService: DbTableRecordsService
    ) {
        super();
        this.keysOfFieldProperties = ['_n', '_t', '_y', '_s', '_f', '_v', '_d', '_m'];
        this.recordForm = null;
        this.recordStructure.push({ 
            'name' : 'web_domain',
            'plural_label' : 'Web Domain',
            'singular_label': 'Web Domain',
            'field_defination' : new FormControl('', [Validators.required]),
        });
    }

    addFieldStructureInRecordStructure(
        type: string = '',
        fieldName: string = '', 
        values: Object[] = [],
        pluralLabel: string = '',
        singularLabel: string = '',
        validators: any[] = []
    ) {
        if (type == 'string') {
            this.recordStructure.push({ 
                'name' : fieldName,
                'plural_label' : pluralLabel,
                'singular_label': singularLabel,
                'field_defination' : new FormControl('', validators),
            });

        } else if (fieldName == 'use') {
            this.recordStructure.push({ 
                'name' : 'use',
                'plural_label' : 'Uses',
                'singular_label': 'Use',
                'values' : values,
                'sub_field_defination' : new FormControl('', []),
                'field_defination': new FormArray(
                    [new FormControl('', [])], 
                    Validators.compose([Validators.minLength(1)])
                ),
            });
            
            this.recordStructure.push({ 
                'name' : 'other_use',
                'plural_label' : 'Other Uses',
                'singular_label': 'Other Use',
                'field_defination' : new FormControl(
                    '', 
                    [Validators.pattern('^[0-9a-zA-Z ]{3,15}$')]
                ),
            });
        
        } else if (fieldName == 'phone_number') {
            this.recordStructure.push({ 
                'name' : 'phone_number',
                'plural_label' : 'Phone Numbers',
                'singular_label': 'Phone Number',
                'field_defination' : new FormControl(
                    '', 
                    [Validators.required, Validators.pattern('^[0-9]{10,13}$')]
                ),
                'help' : 'Phone number is 10 to 13 charecters long',
            });
        
        } else if (fieldName == 'gender') {
            this.recordStructure.push({ 
                'name' : 'gender',
                'plural_label' : 'Genders',
                'singular_label': 'Gender',
                'field_defination' : new FormControl('', []),
            });

        } else if (fieldName == 'abbreviation') {
            this.recordStructure.push({ 
                'name' : 'abbreviation',
                'plural_label' : 'Abbreviations',
                'singular_label': 'Abbreviation',
                'field_defination' : new FormControl('', []),
            });

        } else if (fieldName == 'name') {
            this.recordStructure.push({ 
                'name' : 'name',
                'plural_label' : 'Names',
                'singular_label': 'Name',
                'field_defination' : new FormControl('', []),
            });
            
        
        } else if (fieldName == 'email_address') {
            this.recordStructure.push({ 
                'name' : 'email_address',
                'plural_label' : 'Email Addresses',
                'singular_label': 'Email Address',
                'field_defination' : new FormControl('', [Validators.required, Validators.email]),
            });

       } else if (fieldName == 'passwords') {
            this.recordStructure.push({ 
                'name' : 'passwords',
                'plural_label' : 'Passwords',
                'singular_label': 'Password',
                'sub_field_defination' : new FormControl(
                    '', 
                    [Validators.required, Validators.pattern('^[0-9]{10,13}$')]
                ),
                'field_defination': new FormArray(
                    [new FormControl(
                        '', 
                        [Validators.required, Validators.pattern('^[0-9]{10,13}$')]
                    )], 
                    Validators.compose([Validators.minLength(1)])
                ),
            });

       } else if (fieldName == 'roles') {
            this.recordStructure.push({ 
                'name' : 'roles',
                'plural_label' : 'Roles',
                'singular_label': 'Role',
                'values' : values,
                'sub_field_defination' : new FormControl(
                    '', 
                    [Validators.required]
                ),
                'field_defination': new FormArray(
                    [new FormControl(
                        '', 
                        [Validators.required]
                    )], 
                    Validators.compose([Validators.minLength(1)])
                ),
            });        

        } /* switch */
    } /* addFieldStructureInRecordStructure */

    getFieldStructure(fieldName: string) {
        for (let fieldStructure of this.recordStructure) {
            if (fieldStructure['name'] == fieldName) {
                return fieldStructure;
            }
        }
        return {};
    }

    announceIt(value, emitter, code) {
        this.logIt(['announceIt' , code, value]);
        emitter.emit(value);        
    }

    getParam(r, param, paramValue) {
        this.dataArrived = false;
        this.errorArrived = false;
        this.queryComplete = false;
        this.response = {};

        if (param == undefined) {
            this.errorArrived = true;
            return 'DB_CO-ERROR-PARAMETER_IS_UNDEFINED';
        }
        this.logIt([
            'AppDbCommon before gettin '+param+' from url ', 
            paramValue
        ]);
        if (paramValue == undefined && r  ) {
            this.logIt([
                'AppDbCommon snapshot is ok'
            ]);

            paramValue = r.snapshot.paramMap.get(param);
            this.dataArrived = true;
        }
        this.logIt([
            'AppDbCommon after gettin ' + param + ' from url ',
            paramValue
        ]);
        if (paramValue == undefined) {
            this.errorArrived = true;
            return 'DB_CO-ERROR-GETTING_PARAM_VALUE-' + param;    
        }
        this.logIt([
            'AppDbCommon final ' + param + ' from url ', 
            paramValue
        ]);

        return paramValue;
    } /* getParam */

    sortedFieldsOfRecord(recordStructure) {
        let rs = [];
        if (this.isVariableObject(recordStructure)) {
            for(let key of this.keysOfObject(recordStructure)) {
                // this.logIt(['found in list', key, list[key] ]);
                if (this.isVariableObject(recordStructure[key])) {
                    rs.push(recordStructure[key]);
                }
            }
        }
        if (this.isVariableArray(recordStructure)) {
             rs = recordStructure;
        }
        rs.sort(function(a, b) { 
            if (a._s < b._s) return -1;
            if (a._s > b._s) return 1;
            return 0;
        });

        return rs;
    } /* sortedFieldsOfRecord */

    getLabel(list: any[], property: string, value: string) {
        if (!list || !this.isVariableArray(list)) {
            return 'Error: List is not an array';
        }
        if (!property || property == '') {
            return 'Error: property name is empty';
        }
        if (!value || value == '') {
            return 'Error: value is empty';
        }
        return list[list.findIndex(x => x[property] == value)]['label'];
    }

    createRecordForm() {
        let x = {};
        console.log('createRecordForm this.recordStructure = ', this.recordStructure);
        for (let field of this.recordStructure) {
            x[field['name']] = field['field_defination'];
        }
        this.recordForm = new FormGroup(x);
        console.log('createRecordForm this.recordForm = ', this.recordForm);
        x = null; // release memory
    }
    
    removeControlFromGroup(recordGroup: FormGroup, fieldName: string, i: number) {
        let control = <FormArray>recordGroup.controls[fieldName];
        control.removeAt(i);
        return recordGroup;
    }

    addControlFromGroup(recordGroup: FormGroup, fieldName: string, defaultControl) {
        (<FormArray>recordGroup.controls[fieldName]).push(defaultControl);
        return recordGroup;
    }

    setSubRecord(recordGroup: FormGroup, fieldName: string, subRecord: any[]) {
        console.log('subRecord = ', subRecord);
        
        if (subRecord == undefined || fieldName == undefined || fieldName == '') { 
            return recordGroup;
        }
        recordGroup.setControl(
            fieldName, 
            new FormArray(subRecord.map(subField => new FormGroup(subField)))
        );
        
        return recordGroup;
    }

    initStringNoValidatorsControl() {
        return new FormControl('', []);   
    }
    getSelectedRecordIndex(tableRecords, selectedRecord): number {
        return tableRecords.indexOf(selectedRecord);
    }

    getSpecificTableRecordsValue(tableName = '', titleFields = []) {
        this.dataService.readTableRecordValues(tableName, '.*').subscribe(
            response => {
                if (response != undefined && response) { 
                    console.log('getTableRecordsValue response for '
                        + tableName + ' = ', response);
                    for(let r of response) {
                        console.log(' r = ', r['_id']);
                        let rowTitle = '';
                        for (let titleField of titleFields) {
                            rowTitle = rowTitle + ' | ' + this.toTitleCase(titleField) + ' = ' + JSON.stringify(r[titleField]);
                        }
                        rowTitle = rowTitle + ' | ';
                        this.specificTableValues.push({
                            'label': rowTitle,
                            'value': r['_id']
                        });
                    }
                    
                } else {
                    this.apiGoodMessage = 'No record found';
                }
            },
            error =>  {
                this.apiErrorMessage = error.json();
            }
        );
    }

    getFormValidationErrors(): string[] {
        let errors = [];
        Object.keys(this.recordForm.controls).forEach(key => {
            
            const controlErrors: ValidationErrors = this.recordForm.get(key).errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {
                    errors.push(key + ' : ' + keyError + '; ' + controlErrors[keyError]);
                });
            }
        });
        return errors;
    }
    
    getTableRecordsValue() {
        this.dataService.readTableRecordValues(this.dbTableName, '.*').subscribe(
            response => {
                if (response != undefined && response) { 
                    console.log('getTableRecordsValue response for '
                        + this.dbTableName + ' = ', response);
                    this.tableValues = response;
                    this.dataLoaded = true;
                } else {
                    this.apiGoodMessage = 'No record found';
                }
            },
            error =>  {
                this.apiErrorMessage = error.json();
                this.dataLoaded = false;
            }
        );
        this.title = this.subTitle;
    }

    showDialogToAdd() {
        this.newRecord = true;
        this.apiErrorMessage = '';
        this.apiGoodMessage = '';
        if (this.selectedRecord) {
            this.title = 'Clone ' + this.subTitle;
        } else {
            this.title = 'Add ' + this.subTitle;
        }
        this.displayDialog = true;
    }
    
    save(modal) {
        this.apiErrorMessage = '';
        this.apiGoodMessage = '';
        let si = this.getSelectedRecordIndex(this.tableValues, this.selectedRecord);
        if(this.newRecord) {
            this.dataService.saveRecord(modal , this.dbTableName).subscribe(
                response => {this.apiGoodMessage = 'Added new record';},
                error =>  {this.apiErrorMessage = error.json();}
            );        
        } else {           
            modal['_id'] = this.tableValues[si]['_id'];
            modal['_etag'] = this.tableValues[si]['_etag'];
            this.dataService.updateRecord(modal, this.dbTableName).subscribe(
                response => {this.apiGoodMessage = 'Updated the record';},
                error => {this.apiErrorMessage = error.json();}
            );  
        }

        this.getTableRecordsValue();
        this.selectedRecord = null;
        this.displayDialog = false;
        this.submitted = true;  
    }
    
    delete(modal) {
        this.apiErrorMessage = '';
        this.apiGoodMessage = '';
        let si = this.getSelectedRecordIndex(this.tableValues, this.selectedRecord);
        modal['_id'] = this.tableValues[si]['_id'];
        modal['_etag'] = this.tableValues[si]['_etag'];
        this.dataService.deleteRecord(modal, this.dbTableName).subscribe(
            response => {this.apiGoodMessage = 'Deleted the record';},
            error => {this.apiErrorMessage = error.json();}
        ); 
        this.getTableRecordsValue();
        this.selectedRecord = null;
        this.displayDialog = false;
    }    
}