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
	@Output() emitingFieldValue: EventEmitter<any> = new EventEmitter<any>();

	changedNgModel(value) {
		this.logIt([
			'FieldComponent: changedNgModel: Field is emitting ', value
		]);
		this.emitingFieldValue.emit(value);
	}

	constructor() { 
		super();
	}

	ngOnInit() {
	}

}
