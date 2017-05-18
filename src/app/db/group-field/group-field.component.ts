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
	
	@Input() fieldGroupValue: Object = {};

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
		this.fieldGroupValue[fieldName]['_v'] = value;
		this.emitingFieldGroupValue.emit(this.fieldGroupValue);
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
		obj[this.fieldGroupValueKey] = this.fieldGroupValue;
		this.logIt([
			'GroupFieldComponent: updateFieldGroupValue: is emitting obj = { ', 
			this.fieldGroupValueKey, 
			' = ', obj[this.fieldGroupValueKey], ' }',
			' code = ', c
		]);
		this.emitingRecordValue.emit(this.fieldGroupValue);
	}

	removeValue(fgk) {
		if (fgk != undefined && this.fieldGroupValue[fgk] != undefined) {
			delete 	this.fieldGroupValue[fgk];
			this.logIt(['Remvoed Value = ', fgk, ' from ', 	this.fieldGroupValue]);

			let obj = {};
			obj[this.fieldGroupValueKey] = this.fieldGroupValue;
			this.emitingFieldGroupValue.emit(obj);
		}
	}


	addNewField(key) {
		if (key == 0) {
			for (var i = 1; i <= this.lengthOfObject(this.fieldGroupValue) + 1; i++) {
				if (!this.doesKeyExistsInObject(i, this.fieldGroupValue)) {
					if (this.keysOfFieldProperties.indexOf(key) != -1) continue;
					key = i;
				}
			}
		}
		this.fieldGroupValue[key] = {
			_n: 0, // name
			_t: 'New Field', // title
			_y: 'string', // type
			_s: 1, // sequence
			_f: true, // field type is field
			_v: '', //value
			_d: 'D', // default value
			_m: 0 // multiple values
		}
	}

	addValue(fgk) {
		if (fgk != undefined) {
			if (this.fieldGroupValue == undefined) {
				this.fieldGroupValue = {};
			}
			this.logIt(['Added Value = ', fgk, ' to ', 	this.fieldGroupValue]);
		}
	}

	constructor() { 
		super();
		this.keysOfFieldProperties = ['_n', '_t', '_y', '_s', '_f', '_v', '_d', '_m'];
	}

	ngOnInit() {
	}

}
