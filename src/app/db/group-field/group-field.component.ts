import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppDbCommon } from '../common';

@Component({
	selector: 'app-db-group-field',
	templateUrl: './group-field.component.html',
	styleUrls: ['./group-field.component.css']
})
export class GroupFieldComponent extends AppDbCommon implements OnInit {

	@Input() fieldGroupProperties: Object;
	@Input() fieldGroupValueKey: string;
	@Input() fieldGroupValue: Object;
	@Output() emitingFieldGroupValue: EventEmitter<any> = new EventEmitter<any>();
	@Output() emitingRecordValue: EventEmitter<any> = new EventEmitter<any>();

	applyFieldValue(a, i) {
		if (i == undefined || a == undefined || a[i] == undefined) {
			return '';
		} else {
			return a[i];
		}
	}

	updateFieldValue(fieldName, value, c) {
		this.logIt([
			'GroupFieldComponent: updateFieldValue: ',
			' fieldName = ', fieldName, 
			' value = ', value,
			' code = ', c
		]);
		let obj = {};

		this.fieldGroupValue[fieldName] = value;
		obj[fieldName] = this.fieldGroupValue;
		this.logIt([
			'GroupFieldComponent: updateFieldValue: is emitting obj = { ', 
			fieldName, 
			' = ', obj[fieldName], ' }',
			' code = ', c
		]);
		this.emitingFieldGroupValue.emit(value);
	}

	updateFieldGroupValue(fieldName, value, c) {
		this.logIt([
			'GroupFieldComponent: updateFieldGroupValue: ',
			' fieldName = ', fieldName, 
			' value = ', value,
			' code = ', c
		])
		let obj = {};

		this.fieldGroupValue[fieldName] = value;
		obj[this.fieldGroupValueKey] = this.fieldGroupValue;
		this.logIt([
			'GroupFieldComponent: updateFieldGroupValue: is emitting obj = { ', 
			this.fieldGroupValueKey, 
			' = ', obj[this.fieldGroupValueKey], ' }',
			' code = ', c
		]);
		this.emitingRecordValue.emit(obj);
	}

	removeValue(fgk) {
		
		if (fgk != undefined && this.fieldGroupValue[fgk] != undefined) {
			delete 	this.fieldGroupValue[fgk];
			this.logIt(['Remvoed Value = ', fgk, ' from ', 	this.fieldGroupValue]);

			let obj = {};
			obj[this.fieldGroupValueKey] = this.fieldGroupValue;
			this.emitingFieldGroupValue.emit(obj);
		}

		// this.fieldGroupValuesKeys = Object.keys(this.fieldGroupValues);
		// obj[this.fieldGroupProperties['f1']] = this.fieldGroupValues;
		// //console.log('RecordFieldGroupComponent: removeValue: Field Group is emitting obj = ', obj);
 	// 	this.fieldGroupValueUpdated.emit(obj);

	}

	addValue(fgk) {
		if (fgk != undefined) {
			if (this.fieldGroupValue == undefined) {
				this.fieldGroupValue = {};
			}
			if (this.fieldGroupValue[fgk] == undefined || typeof this.fieldGroupValue[fgk] == 'string') {
				this.fieldGroupValue[fgk] = [];
			}
 			this.fieldGroupValue[fgk].push('');

			this.logIt(['Added Value = ', fgk, ' to ', 	this.fieldGroupValue]);
		}

		// let obj = {};
		// let group = {};
		/* console.log('RecordFieldGroupComponent: addValue: ' +
			"this.fieldGroupProperties['fields']['sorted_field_names'] = ", 
			this.fieldGroupProperties['fields']['sorted_field_names']
		); */
		/* console.log('RecordFieldGroupComponent: addValue: ' +
			"this.fieldGroupProperties['fields'] = ", 
			this.fieldGroupProperties['fields']
		); */
		// if (!this.fieldGroupValues) { this.fieldGroupValues = []; }
		// for (var fieldName of this.fieldGroupProperties['sorted_field_names']) {
		// 	console.log('RecordFieldGroupComponent: addValue: fieldName = ', fieldName);
		// 	/* f6 is default value */
		// 	group[fieldName] = this.fieldGroupProperties[fieldName]['f6'];
		// }
		// this.fieldGroupValues[this.fieldGroupValuesKeys.length] = group;
		// this.fieldGroupValuesKeys = Object.keys(this.fieldGroupValues);
		// obj[this.fieldGroupProperties['f1']] = this.fieldGroupValues;
		//console.log('RecordFieldGroupComponent: addValue: group = ', group);
		//console.log('this.fieldGroupValuesKeys.length =', this.fieldGroupValuesKeys.length);
		//console.log('RecordFieldGroupComponent: addValue: Field Group is emitting obj = ', obj);
		// this.fieldGroupValueUpdated.emit(obj);
	}

	constructor() { 
		super();
	}

	ngOnInit() {
	}

}
