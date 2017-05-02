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
		console.log('Received in field group = valueKey ', valueKey, ' fieldGroupPropertyName ', fieldGroupPropertyName,  ' value ', value);
		let obj = {};
		this.fieldGroupValues[valueKey][fieldGroupPropertyName] = value[fieldGroupPropertyName];
		obj[this.fieldGroupProperties['f1']] = this.fieldGroupValues;
		console.log('Field Group is emitting obj = ', obj);
		this.fieldGroupValueUpdated.emit(obj);
	}

	removeValue(fgk) {
		let obj = {};
		console.log('Remvoe VAlue = ', fgk, ' from ', 	this.fieldGroupValues);
		delete 	this.fieldGroupValues[fgk];
		this.fieldGroupValuesKeys = Object.keys(this.fieldGroupValues);
		obj[this.fieldGroupProperties['f1']] = this.fieldGroupValues;
		console.log('Field Group is emitting obj = ', obj);
 		this.fieldGroupValueUpdated.emit(obj);
	}

	addValue() {
		let obj = {};
		let group = {};
		for (var fieldName in this.fieldGroupProperties['fields']['sorted_field_names']) {
			group[fieldName] = this.fieldGroupProperties['fields'][fieldName];
		}
		console.log('group = ', group);
		console.log('this.fieldGroupValuesKeys.length =', this.fieldGroupValuesKeys.length);
		this.fieldGroupValues[this.fieldGroupValuesKeys.length] = group;
		this.fieldGroupValuesKeys = Object.keys(this.fieldGroupValues);
		obj[this.fieldGroupProperties['f1']] = this.fieldGroupValues;
		this.fieldGroupValueUpdated.emit(obj);
	}

	constructor() { }

	ngOnInit() {
		if (this.fieldGroupProperties['f1'] == undefined) {
			this.fieldGroupProperties['f1'] = 'unknown_field_group_property';
		}

		if (this.fieldGroupProperties == undefined) {
			this.fieldGroupProperties = {
				field_type: 'field_group',
				title: 'Group Fields',
				multiple: true,
				field_group: true,
				fields: [
					{
						default_value: 'dv1',
						field_type: 'field'
					},
					{
						default_value: 'dv2',
						field_type: 'field'
					}
				]
			}
		}

		if (this.fieldGroupValues == undefined) {
			this.fieldGroupValues = { 0 : ['G1', 'G2'] };
		}

		this.fieldGroupValuesKeys = Object.keys(this.fieldGroupValues);

		console.log('Field Group Properties = ', this.fieldGroupProperties);
		console.log('Field Group Values = ', this.fieldGroupValues);
	}

}
