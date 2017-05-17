import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppDbCommon } from '../common';

@Component({
	selector: 'app-db-group-field',
	templateUrl: './group-field.component.html',
	styleUrls: ['./group-field.component.css']
})
export class GroupFieldComponent extends AppDbCommon implements OnInit {

	@Input() fieldGroupProperties: Object;
	@Input() fieldGroupValue: Object;
	@Output() emitingFieldGroupValue: EventEmitter<any> = new EventEmitter<any>();
	@Output() emitingRecordValue: EventEmitter<any> = new EventEmitter<any>();

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
		obj[fieldName] = this.fieldGroupValue;
		this.logIt([
			'GroupFieldComponent: updateFieldGroupValue: is emitting obj = { ', 
			fieldName, 
			' = ', obj[fieldName], ' }',
			' code = ', c
		]);
		this.emitingRecordValue.emit(obj);
	}

	constructor() { 
		super();
	}

	ngOnInit() {
	}

}
