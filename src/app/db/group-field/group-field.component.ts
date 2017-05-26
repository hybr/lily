import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppDbCommon } from '../common';

@Component({
	selector: 'app-db-group-field',
	templateUrl: './group-field.component.html',
	styleUrls: ['./group-field.component.css']
})
export class GroupFieldComponent extends AppDbCommon implements OnInit {
	public showProperty: boolean = false;
	private nextKey: string = '';

	//@Input() fieldGroupProperties: Object;
	@Input() fieldGroupValueKey: string = 'uk';
	
	@Input() fieldGroupValues: Object = {};
	@Input() fieldGroupStructure: any[] = [];
	@Input() tableNumber: string = '';

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

	getNewKey(values) {
		this.nextKey =  'f' + (this.lengthOfVariable(values) + 1);
		// if (key == undefined) key = 1;
		// if (key == 0) {
		// 	for (var i = 0; i <= this.lengthOfVariable(values); i++) {
		// 		if (!this.doesKeyExists(i, values)) {
		// 			if (this.keysOfFieldProperties.indexOf(key) != -1) continue;
		// 			key = i;
		// 		}
		// 	}
		// }
		// return key;
	}

	addNewFieldStructure(structure) {
		var defaultField = {
			_n: this.nextKey, // name
			_t: 'Field Title', // title
			_y: 'string', // type
			_s: this.lengthOfVariable(structure)+1, // sequence
			_f: true, // field type is field
			_d: '', // default value
			_m: 0, // multiple values
			_r: false, // required
			_o: '', // foreign collection name
			_i: '', // foreign title fields, comma seperated
			_l: '', // name of static list
		};	
		if (!this.isVariableObject(structure)) {
			structure = {};
		}
		structure[this.nextKey] = defaultField;
		return structure;
	}

	addNewFieldValues(values) {
		if (values == undefined 
			|| (!this.isVariableObject(values)) 
			|| this.isVariableArray(values) 
			|| this.isVariableEmpty(values)
		) {
			values = {};
		}
		values[this.nextKey] = '';
		return values;
	}


	addNewField(key, values, structure) {
		/* this is used during the structure bulding of t1 table */
		this.getNewKey(values[key]);

		this.fieldGroupValues[key] = this.addNewFieldValues(values[key]);
		this.announceIt(
			this.fieldGroupValues,
			this.groupFieldValueIsUpdated,
			'GroupFieldComponent: addNewField: groupFieldValueIsUpdated '
		);
		this.fieldGroupStructure[key] = this.addNewFieldStructure(structure[key]);
		this.announceIt(
			this.fieldGroupStructure,
			this.groupFieldStructureIsUpdated,
			'GroupFieldComponent: addNewField: groupFieldStructureIsUpdated '
		);		
	}
	

	addSameFieldValues(key, values, structure) {
		if (values == undefined 
			|| (!this.isVariableObject(values)) 
			|| this.isVariableArray(values) 
			|| this.isVariableEmpty(values)
		) {
			values = {};
		}


		if (structure[key]['_m'] > 0) {
			// field contains multiple values
			if (!this.isVariableArray(values[key])) {
				values[key] = [];
			}
			for (let subKey of this.keysOfObject(structure[key])) {
				if (this.isVariableObject(structure[key][subKey])) {
					values[key].push(this.addSameFieldValues(subKey,  values[key], structure[key]));
				}
			}			
		} else if (!structure[key]['_f']) {
			// field contains more than one field
			if (!this.isVariableObject(values[key])) {
				values[key] = {};
			}
			for (let subKey of this.keysOfObject(structure[key])) {
				if (this.isVariableObject(structure[key][subKey])) {
					values[key] = this.addSameFieldValues(subKey,  values[key], structure[key]);
				}
			}				
		} else {
			// field has simple value
			if (this.typeOfVariable(values[key]) != 'string') {
				values[key] = '';
			}
			for (let subKey of this.keysOfObject(structure[key])) {
				if (this.isVariableObject(structure[key][subKey])) {
					values[key] = this.addSameFieldValues(subKey,  values[key], structure[key]);
				}
			}			
		}
		return values;
	}

	addSameField(key, values, structure) {
		/* this is used in other tables to add data for multiple fields */
		this.announceIt(
			this.addSameFieldValues(key, values, structure),
			this.groupFieldValueIsUpdated,
			'GroupFieldComponent: addNewField: groupFieldValueIsUpdated '
		);
	}
	
	constructor() { 
		super();
	}

	ngOnInit() {
		if (this.fieldGroupValues == undefined || !this.isVariableObject(this.fieldGroupValues)) {
			this.fieldGroupValues = {};
		}
		this.logIt(['GroupFieldComponent: ngOnInit: fieldGroupValues received', this.fieldGroupValues]);
		this.logIt(['GroupFieldComponent: ngOnInit: fieldGroupStructure received', this.fieldGroupStructure]);
	}
}
