import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppDbCommon } from '../common';

@Component({
	selector: 'app-db-field-property',
	templateUrl: './field-property.component.html',
	styleUrls: ['./field-property.component.css']
})
export class FieldPropertyComponent extends AppDbCommon implements OnInit {

	@Input() field: Object = {};
	@Output() emitingPropertyValue: EventEmitter<any> = new EventEmitter<any>();

	changedNgModel(key, value) {
		this.logIt([
			'FieldPropertyComponent: changedNgModel: emitting ', value
			]);
		this.field[key] = value;
		this.emitingPropertyValue.emit(this.field);
	}

	constructor() { 
		super();
	}

	ngOnInit() {
	}

}
