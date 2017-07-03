import { Component, Input} from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { AppCommon } from '../common';

@Component({
    selector: 'app-form-common',
    template: ''
})
export class AppFormCommon  extends AppCommon {

	constructor() { super(); }

	@Input() mainForm: FormGroup;
	@Input() submitClicked: boolean;
	@Input() fieldStructure: Object;
	@Input() values: Object[];

	get fieldControlName(): string {
		return this.fieldStructure['name'];
	}

	get pluralLabel(): string {
		return this.fieldStructure['plural_label'];
	}

	get singularlLabel(): string {
		return this.fieldStructure['singular_label'];
	}


	get validationControl() {
		return this.mainForm['controls'][this.fieldControlName];
	}

	get validity(): boolean {
		let c = this.validationControl;
		return c.errors.hasOwnProperty(this.fieldControlName) && c.dirty
	}

	get inputId(): string {
		return this.fieldControlName + '_id';
	}

	get controlLength() {
		return this.validationControl['controls'].length;
	}

	get childrenOfControl() {
		if (this.validationControl) {
			return this.validationControl['controls'];
		} else {
			return null;
		}
	}

	get hasItemsInList() {
		return (this.controlLength > 1);
	}


	get controlsToBeAdded() {
		return this.fieldStructure['sub_field_defination']; 
	}

	get selectOptions() {
		if (this.doesKeyExists('values', this.fieldStructure)) {
			return this.fieldStructure['values'];
		} else {
			return [];
		}
	}

	get hasOptions() {
		return (this.doesKeyExists('values', this.fieldStructure));
	}

    addControlFromGroup(recordGroup: FormGroup, fieldName: string) {
        (<FormArray>recordGroup.controls[fieldName]).push(this.controlsToBeAdded);
        return recordGroup;
    }

    removeControlFromGroup(recordGroup: FormGroup, fieldName: string, i: number) {
        let control = <FormArray>recordGroup.controls[fieldName];
        control.removeAt(i);
        return recordGroup;
    }
}