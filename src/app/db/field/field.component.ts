import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppDbCommon } from '../common';

@Component({
	selector: 'app-db-field',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.css']
})
export class FieldComponent extends AppDbCommon implements OnInit {
	@Input() fieldProperties: Object = {};
	@Input() fieldValue : string = '';
	@Output() fieldValueUpdated: EventEmitter<any> = new EventEmitter<any>();

	changedNgModel(value) {
		let obj = {};
		if (this.fieldProperties['n'] == undefined) {
			this.fieldProperties['n'] = 'unknown_field_property';
		}
		obj[this.fieldProperties['n']] = value;

		this.logIt([
			'FieldComponent: Field is emitting obj = { ', 
			this.fieldProperties['n'], 
			' = ', value, ' }'
		]);
		this.fieldValueUpdated.emit(obj);
	}

	constructor() { 
		super();
	}

	ngOnInit() {
	}

}
