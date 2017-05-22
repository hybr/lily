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
	@Output() fieldIsUpdated: EventEmitter<any> = new EventEmitter<any>();
	@Output() fieldPropertiesIsUpdated: EventEmitter<any> = new EventEmitter<any>();

	changedNgModel(value) {
		if (value != undefined) {
			this.fieldValue = value;
		} else {
			if (this.fieldProperties['_d'] != undefined) {
				this.fieldValue = this.fieldProperties['_d'];
			} else {
				if (this.fieldProperties['_y'].toLowerCase() == 'boolean') {
					this.fieldValue = true;
				} else if (this.fieldProperties['_y'].toLowerCase() == 'number') {
					this.fieldValue = 0;
				} else if (this.fieldProperties['_y'].toLowerCase() == 'field_type') {
					this.fieldValue = true;
				} else if (this.fieldProperties['_y'].toLowerCase() == 'field_sequence') {
					this.fieldValue = 1;
				} else {
					this.fieldValue = '';	
				}
			}
		}		
		this.announceIt(
			this.fieldValue,
			this.fieldIsUpdated,
			'FieldComponent: changedNgModel'
		);
	}

	updateFieldProperties(updatedProperties) {
		this.fieldProperties = updatedProperties;
		if (this.fieldProperties['_m'] > 0) {
			// if field allow multiple values make it field group
			this.fieldProperties['_f'] = false;
			this.logIt(['FieldComponent: updateFieldProperties: Making field as field group as multiple become more than 0']);
		}
		if (this.fieldProperties['_f'] == false && this.fieldProperties['_m'] < 1) {
			// if a filed is of type field group then allow multiple values inside
			this.fieldProperties['_m'] = 1;
			this.logIt(['FieldComponent: updateFieldProperties: Allowing multiple values as field type changed to group']);
		}
		if (this.fieldProperties['_m'] > 0 && (!this.isVariableObject(this.fieldValue))) {
			// field value should change to object for field_group or multiple values
			this.fieldValue = {};
			this.announceIt(
				this.fieldValue,
				this.fieldIsUpdated,
				'FieldComponent: changedNgModel'
			);
		}

		this.announceIt(
			this.fieldProperties,
			this.fieldPropertiesIsUpdated,
			'FieldComponent: updateFieldProperties'
		);
	}
	
	constructor() { 
		super();
	}

	ngOnInit() {
	}

}
