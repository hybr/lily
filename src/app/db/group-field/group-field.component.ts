import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppDbCommon } from '../common';

@Component({
	selector: 'app-db-group-field',
	templateUrl: './group-field.component.html',
	styleUrls: ['./group-field.component.css']
})
export class GroupFieldComponent extends AppDbCommon implements OnInit {
	public keysOfFieldProperties: string[] = [];

	//@Input() fieldGroupProperties: Object;
	@Input() fieldGroupValueKey: string = 'uk';
	
	@Input() fieldGroupValues: Object = {};
	@Input() fieldGroupStructure: Object = {};

	@Output() emitingFieldGroupValue: EventEmitter<any> = new EventEmitter<any>();
	@Output() emitingRecordValue: EventEmitter<any> = new EventEmitter<any>();

	applyFieldValue(a, i) {
		if (i == undefined || a == undefined || a[i] == undefined) {
			return '';
		} else {
			return a[i];
		}
	}

	updateFieldValue(fieldName, value, c) {
		this.logIt([
			'GroupFieldComponent: updateFieldValue: ',
			' fieldName = ', fieldName, 
			' value = ', value,
			' code = ', c
		]);
		this.fieldGroupValues[fieldName]['_v'] = value;
		this.emitingFieldGroupValue.emit(this.fieldGroupValues);
	}

	updateFieldGroupValue(fieldName, value, c) {
		this.logIt([
			'GroupFieldComponent: updateFieldGroupValue: ',
			' fieldName = ', fieldName, 
			' value = ', value,
			' code = ', c
		])
		let obj = {};

		this.fieldGroupValues[fieldName] = value;
		obj[this.fieldGroupValueKey] = this.fieldGroupValues;
		this.logIt([
			'GroupFieldComponent: updateFieldGroupValue: is emitting obj = { ', 
			this.fieldGroupValueKey, 
			' = ', obj[this.fieldGroupValueKey], ' }',
			' code = ', c
		]);
		this.emitingRecordValue.emit(this.fieldGroupValues);
	}

	removeValue(fgk) {
		if (fgk != undefined && this.fieldGroupValues[fgk] != undefined) {
			delete 	this.fieldGroupValues[fgk];
			this.logIt(['Remvoed Value = ', fgk, ' from ', 	this.fieldGroupValues]);

			let obj = {};
			obj[this.fieldGroupValueKey] = this.fieldGroupValues;
			this.emitingFieldGroupValue.emit(obj);
		}
	}

	addNewField(key) {
		if (key == 0) {
			for (var i = 1; i <= this.lengthOfObject(this.fieldGroupValues) + 1; i++) {
				if (!this.doesKeyExistsInObject(i, this.fieldGroupValues)) {
					if (this.keysOfFieldProperties.indexOf(key) != -1) continue;
					key = i;
				}
			}
		}
		this.fieldGroupValues[key] = {
			_n: 0, // name
			_t: 'New Field', // title
			_y: 'string', // type
			_s: 1, // sequence
			_f: true, // field type is field
			_d: 'D', // default value
			_m: 0 // multiple values
		}
	}

	addValue(fgk) {
		if (fgk != undefined) {
			if (this.fieldGroupValues == undefined) {
				this.fieldGroupValues = {};
			}
			this.logIt(['Added Value = ', fgk, ' to ', 	this.fieldGroupValues]);
		}
	}

	constructor() { 
		super();
		this.keysOfFieldProperties = ['_n', '_t', '_y', '_s', '_f', '_v', '_d', '_m'];
	}

	ngOnInit() {
	}

}
