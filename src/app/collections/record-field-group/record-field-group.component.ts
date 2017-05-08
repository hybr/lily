import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RecordFieldComponent } from '../record-field/record-field.component';

@Component({
	selector: 'app-collections-record-field-group',
	templateUrl: './record-field-group.component.html',
	styleUrls: ['./record-field-group.component.css'],

})
export class RecordFieldGroupComponent implements OnInit {

	@Input() fieldGroupProperties: Object = {};
	@Input() fieldGroupValues : Object = {};
	@Output() fieldGroupValueUpdated: EventEmitter<any> = new EventEmitter<any>();

	private fieldGroupValuesKeys : Array<any> = <any>[];

	updateFieldValue(valueKey, fieldGroupPropertyName, value) {
		//console.log('RecordFieldGroupComponent: Received in field group = valueKey ', valueKey, ' fieldGroupPropertyName ', fieldGroupPropertyName,  ' value ', value);
		let obj = {};
		this.fieldGroupValues[valueKey][fieldGroupPropertyName] = value[fieldGroupPropertyName];
		obj[this.fieldGroupProperties['f1']] = this.fieldGroupValues;
		//console.log('RecordFieldGroupComponent: updateFieldValue: Field Group is emitting obj = ', obj);
		this.fieldGroupValueUpdated.emit(obj);
	}

	removeValue(fgk) {
		let obj = {};
		//console.log('Remvoe VAlue = ', fgk, ' from ', 	this.fieldGroupValues);
		delete 	this.fieldGroupValues[fgk];
		this.fieldGroupValuesKeys = Object.keys(this.fieldGroupValues);
		obj[this.fieldGroupProperties['f1']] = this.fieldGroupValues;
		//console.log('RecordFieldGroupComponent: removeValue: Field Group is emitting obj = ', obj);
 		this.fieldGroupValueUpdated.emit(obj);
	}

	addValue() {
		let obj = {};
		let group = {};
		/* console.log('RecordFieldGroupComponent: addValue: ' +
			"this.fieldGroupProperties['fields']['sorted_field_names'] = ", 
			this.fieldGroupProperties['fields']['sorted_field_names']
		); */
		/* console.log('RecordFieldGroupComponent: addValue: ' +
			"this.fieldGroupProperties['fields'] = ", 
			this.fieldGroupProperties['fields']
		); */
		for (var fieldName of this.fieldGroupProperties['fields']['sorted_field_names']) {
			console.log('RecordFieldGroupComponent: addValue: fieldName = ', fieldName);
			/* f6 is default value */
			group[fieldName] = this.fieldGroupProperties['fields'][fieldName]['f6'];
		}
		//console.log('RecordFieldGroupComponent: addValue: group = ', group);
		//console.log('this.fieldGroupValuesKeys.length =', this.fieldGroupValuesKeys.length);
		if (!this.fieldGroupValues) { this.fieldGroupValues = []; }
		this.fieldGroupValues[this.fieldGroupValuesKeys.length] = group;
		this.fieldGroupValuesKeys = Object.keys(this.fieldGroupValues);
		obj[this.fieldGroupProperties['f1']] = this.fieldGroupValues;
		//console.log('RecordFieldGroupComponent: addValue: Field Group is emitting obj = ', obj);
		this.fieldGroupValueUpdated.emit(obj);
	}

	constructor() { }

	ngOnInit() {
		if (this.fieldGroupValues) {
			this.fieldGroupValuesKeys = Object.keys(this.fieldGroupValues);
		}
		//console.log('Field Group Properties = ', this.fieldGroupProperties);
		//console.log('Field Group Values = ', this.fieldGroupValues);
	}

}
