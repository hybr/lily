import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppDbCommon } from '../common';

@Component({
	selector: 'app-db-field-property',
	templateUrl: './field-property.component.html',
	styleUrls: ['./field-property.component.css']
})
export class FieldPropertyComponent extends AppDbCommon implements OnInit {

	@Input() fieldProperties: Object = {};
	@Output() fieldPropertiesIsUpdated: EventEmitter<any> = new EventEmitter<any>();

	changedNgModel(key, value) {
		this.fieldProperties[key] = value;		
		this.announceIt(
			this.fieldProperties,
			this.fieldPropertiesIsUpdated,
			'FieldPropertyComponent: changedNgModel'
		);
	}

	constructor() { 
		super();
	}

	ngOnInit() {
	}

}
