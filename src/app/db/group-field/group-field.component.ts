import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppDbCommon } from '../common';

@Component({
	selector: 'app-db-group-field',
	templateUrl: './group-field.component.html',
	styleUrls: ['./group-field.component.css']
})
export class GroupFieldComponent extends AppDbCommon implements OnInit {
	public keysOfFieldProperties: string[] = [];
	public showProperty: boolean = false;

	//@Input() fieldGroupProperties: Object;
	@Input() fieldGroupValueKey: string = 'uk';
	
	@Input() fieldGroupValues: Object = {};
	@Input() fieldGroupStructure: any[] = [];

	@Output() fieldEmiting: EventEmitter<any> = new EventEmitter<any>();

	@Output() groupFieldValueIsUpdated: EventEmitter<any> = new EventEmitter<any>();
	@Output() groupFieldStructureIsUpdated: EventEmitter<any> = new EventEmitter<any>();
	@Output() userAction: EventEmitter<any> = new EventEmitter<any>();

	applyFieldValue(a, i) {
		if (i == undefined || a == undefined || a[i] == undefined) {
			return '';
		} else {
			return a[i];
		}
	}

	updateFieldValue(fieldName, value, code) {
		this.fieldGroupValues[fieldName] = value;
		this.announceIt(
			this.fieldGroupValues,
			this.groupFieldValueIsUpdated,
			'GroupFieldComponent: updateFieldValue: groupFieldValueIsUpdated ' + code
		);
	}

	updateFieldProperties(fieldName, updatedProperties, code) {
		this.fieldGroupStructure[fieldName] = updatedProperties;
		this.announceIt(
			this.fieldGroupStructure,
			this.groupFieldStructureIsUpdated,
			'GroupFieldComponent: updateFieldProperties: groupFieldStructureIsUpdated ' + code
		);	
	}



	updateFieldGroupValue(fieldName, value, code) {
		this.fieldGroupValues[fieldName] = value;
		this.announceIt(
			this.fieldGroupValues,
			this.groupFieldValueIsUpdated,
			'GroupFieldComponent: updateFieldGroupValue: groupFieldValueIsUpdated ' + code
		);
	}

	updateFieldGroupStructure(fieldName, value, code) {
		this.fieldGroupStructure[fieldName] = value;
		this.announceIt(
			this.fieldGroupStructure,
			this.groupFieldStructureIsUpdated,
			'GroupFieldComponent: updateFieldGroupStructure: groupFieldStructureIsUpdated ' + code
		);
	}

	removeValue(fgk) {
		if (fgk != undefined && this.fieldGroupValues[fgk] != undefined) {
			delete 	this.fieldGroupValues[fgk];
			delete this.fieldGroupStructure[fgk];
			this.announceIt(
				this.fieldGroupValues,
				this.groupFieldValueIsUpdated,
				'GroupFieldComponent: removeValue: groupFieldValueIsUpdated '
			);
			this.announceIt(
				this.fieldGroupStructure,
				this.groupFieldStructureIsUpdated,
				'GroupFieldComponent: updateFieldGroupStructure: groupFieldStructureIsUpdated '
			);
		}
	}

	getNewKey(values, key) {
		if (key == undefined) key = 1;
		if (key == 0) {
			for (var i = 0; i <= this.lengthOfVariable(values); i++) {
				if (!this.doesKeyExists(i, values)) {
					if (this.keysOfFieldProperties.indexOf(key) != -1) continue;
					key = i;
				}
			}
		}
		return key;
	}

	addNewFieldStructure(structure, key) {
		var defaultField = {
			_n: key, // name
			_t: 'Field Title', // title
			_y: 'string', // type
			_s: key, // sequence
			_f: true, // field type is field
			_d: '', // default value
			_m: 0 // multiple values
		};	
		if (!this.isVariableObject(structure)) {
			structure = {};
		}
		if (structure[key] == undefined) {
			structure[key] = defaultField;
		}
		return structure;
	}

	addNewFieldValues(values, key) {
		if (!this.isVariableObject(values)) {
			values = {};
		}
		var newKey = this.getNewKey(values, key);
		if (values[newKey] == undefined) {
			values[newKey] = '';
		}
		return [values, newKey];
	}


	addNewField(values, structure, key) {
		let newKey = key;

		let a = this.addNewFieldValues(
			values,
			newKey
		);
		values = a[0];
		newKey = a[1];

		structure = this.addNewFieldStructure(
			structure,
			newKey
		);


		this.announceIt(
			values,
			this.groupFieldValueIsUpdated,
			'GroupFieldComponent: addNewField: groupFieldValueIsUpdated ' + newKey
		);
		this.announceIt(
			structure,
			this.groupFieldStructureIsUpdated,
			'GroupFieldComponent: addNewField: groupFieldStructureIsUpdated ' + newKey
		);		
	}

	getKeysOfRecordStructures() {
		if (this.isVariableObject(this.fieldGroupStructure)) {
			let rs = [];
			for(let key of this.keysOfObject(this.fieldGroupStructure)) {
				rs.push(this.fieldGroupStructure[key]);
			}
			return rs;
		}
		return this.fieldGroupStructure;
	}
	
	constructor() { 
		super();
		this.keysOfFieldProperties = ['_n', '_t', '_y', '_s', '_f', '_v', '_d', '_m'];
	}

	ngOnInit() {
		if (this.fieldGroupValues == undefined || !this.isVariableObject(this.fieldGroupValues)) {
			this.fieldGroupValues = {};
		}
		// if (this.fieldGroupStructure == undefined) {
		// 	this.fieldGroupStructure = [];
		// } 
		// if (this.isVariableObject(this.fieldGroupStructure)) {
		// 	this.fieldGroupStructure = [this.fieldGroupStructure];
		// }
		this.logIt(['GroupFieldComponent: ngOnInit: fieldGroupValues received', this.fieldGroupValues]);
		this.logIt(['GroupFieldComponent: ngOnInit: fieldGroupStructure received', this.fieldGroupStructure]);
	}
}
