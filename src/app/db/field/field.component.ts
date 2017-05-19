import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppDbCommon } from '../common';

@Component({
	selector: 'app-db-field',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.css']
})
export class FieldComponent extends AppDbCommon implements OnInit {
	@Input() fieldProperties: Object = {};
	@Input() fieldValue: Object = {};
	@Output() emitingFieldValue: EventEmitter<any> = new EventEmitter<any>();

	changedNgModel(value) {
		this.logIt([
			'FieldComponent: changedNgModel: Field is emitting ', value
		]);
		this.emitingFieldValue.emit(value);
	}

	updateFieldProperties(value) {
		let v: any;
		if (this.fieldValue['_v'] == undefined) {
			v = this.fieldValue['_v'];
		} else {
			if (this.fieldValue['_d'] == undefined) {
				v = this.fieldValue['_d'];
			} else {
				v = '';
			}
		}
		this.fieldValue = value;
		this.fieldValue['_v'] = v;
	}

	constructor() { 
		super();
	}

	ngOnInit() {
	}

}
