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
	@Output() fieldGroupValueUpdated: EventEmitter<any> = new EventEmitter<any>();
	@Output() fieldRecordValueUpdated: EventEmitter<any> = new EventEmitter<any>();

	updateFieldValue(fieldGroupPropertyName, value) {
		this.logIt([
			'GroupFieldComponent: Received in field = fieldGroupPropertyName ', 
			fieldGroupPropertyName, 
			' value ', value
		]);
		let obj = {};

		this.fieldGroupValue[fieldGroupPropertyName] = value;
		obj[fieldGroupPropertyName] = this.fieldGroupValue;
		this.logIt([
			'GroupFieldComponent: Field is emitting obj = { ', 
			fieldGroupPropertyName, 
			' = ', value, ' }'
		]);
		this.fieldGroupValueUpdated.emit(obj);
	}

	updateFieldGroupValue(fieldGroupPropertyName, value) {
		this.logIt([
			'GroupFieldComponent: Received in group = field ', 
			fieldGroupPropertyName, 
			' value ', value
		]);
		let obj = {};

		this.fieldGroupValue[fieldGroupPropertyName] = value;
		obj[fieldGroupPropertyName] = this.fieldGroupValue;
		this.logIt([
			'GroupFieldComponent: Field is emitting obj = { ', 
			fieldGroupPropertyName, 
			' = ', value, ' }'
		]);
		this.fieldRecordValueUpdated.emit(obj);
	}

	constructor() { 
		super();
	}

	ngOnInit() {
	}

}
