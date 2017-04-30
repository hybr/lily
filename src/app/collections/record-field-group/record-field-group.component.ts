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

	updateFieldValue(fgvc, fieldGroupPropertyName, value) {
		let obj = {};
		if (this.fieldGroupProperties['name'] == undefined) {
			this.fieldGroupProperties['name'] = 'unknown_field_group_property';
		}
		this.fieldGroupValues[fgvc][fieldGroupPropertyName] = value[fieldGroupPropertyName];

		obj[this.fieldGroupProperties['name']] = this.fieldGroupValues;
		this.fieldGroupValueUpdated.emit(obj);
	}

	removeValue(fgk) {
		console.log('Remvoe VAlue = ', fgk);
		delete 	this.fieldGroupValues[fgk];
		this.fieldGroupValuesKeys = Object.keys(this.fieldGroupValues);
 		this.fieldGroupValueUpdated.emit(this.fieldGroupValues);
	}

	addValue() {
		let group = {};
		for (var fieldName in this.fieldGroupProperties['fields']['sorted_field_names']) {
			group[fieldName] = this.fieldGroupProperties['fields'][fieldName];
		}
		this.fieldGroupValues[this.fieldGroupValuesKeys.length] = group;
		this.fieldGroupValuesKeys = Object.keys(this.fieldGroupValues);
		this.fieldGroupValueUpdated.emit(this.fieldGroupValues);
	}

	constructor() { }

	ngOnInit() {
		if (this.fieldGroupProperties['name'] == undefined) {
			this.fieldGroupProperties['name'] = 'unknown_field_group_property';
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
	}

}
