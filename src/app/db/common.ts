import { Component } from '@angular/core';
import { AppCommon } from '../common';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-db-common',
	templateUrl: './common'
})
export class AppDbCommon extends AppCommon {
	public tableOfTables: string = 't1';
	public tableNumberRecordName: string = 'f2';

	public keysOfFieldProperties: string[] = [];

	constructor() {
		super();
		this.keysOfFieldProperties = ['_n', '_t', '_y', '_s', '_f', '_v', '_d', '_m'];
	}

	announceIt(value, emitter, code) {
		this.logIt(['announceIt' , code, value]);
		emitter.emit(value);		
	}

	getParam(r, param, paramValue) {
		this.dataArrived = false;
		this.errorArrived = false;
		this.queryComplete = false;
		this.response = {};

		if (param == undefined) {
			this.errorArrived = true;
			return 'DB_CO-ERROR-PARAMETER_IS_UNDEFINED';
		}
		this.logIt([
			'AppDbCommon before gettin '+param+' from url ', 
			paramValue
		]);
		if (paramValue == undefined && r  ) {
			this.logIt([
				'AppDbCommon snapshot is ok'
			]);

			paramValue = r.snapshot.paramMap.get(param);
			this.dataArrived = true;
		}
		this.logIt([
			'AppDbCommon after gettin ' + param + ' from url ',
			paramValue
		]);
		if (paramValue == undefined) {
			this.errorArrived = true;
			return 'DB_CO-ERROR-GETTING_PARAM_VALUE-' + param;	
		}
		this.logIt([
			'AppDbCommon final ' + param + ' from url ', 
			paramValue
		]);

		return paramValue;
	} /* getParam */

	sortedFieldsOfRecord(recordStructure) {
		let rs = [];
		if (this.isVariableObject(recordStructure)) {
			for(let key of this.keysOfObject(recordStructure)) {
				// this.logIt(['found in list', key, list[key] ]);
				if (this.isVariableObject(recordStructure[key])) {
					rs.push(recordStructure[key]);
				}
			}
		}
		if (this.isVariableArray(recordStructure)) {
		 	rs = recordStructure;
		}
		rs.sort(function(a, b) { 
			if (a._s < b._s) return -1;
			if (a._s > b._s) return 1;
			return 0;
		});

		return rs;
	} /* sortedFieldsOfRecord */

    getLabel(list: any[], property: string, value: string) {
        if (!list || !this.isVariableArray(list)) {
        	return 'Error: List is not an array';
        }
        if (!property || property == '') {
        	return 'Error: property name is empty';
		}
		if (!value || value == '') {
			return 'Error: value is empty';
		}
        return list[list.findIndex(x => x[property] == value)]['label'];
    }

    removeControlFromGroup(recordGroup: FormGroup, fieldName: string, i: number) {
        let control = <FormArray>recordGroup.controls[fieldName];
        control.removeAt(i);
        return recordGroup;
    }

    addControlFromGroup(recordGroup: FormGroup, fieldName: string, defaultControl) {
        (<FormArray>recordGroup.controls[fieldName]).push(defaultControl);
        return recordGroup;
    }

    setSubRecord(recordGroup: FormGroup, fieldName: string, subRecord: any[]) {
    	console.log('subRecord = ', subRecord)
        // let fFGs = subRecord.map(subField => new FormGroup(subField));
        // let fFormArray = new FormArray(fFGs);
        // recordGroup.registerControl(fieldName, fFormArray);
        return recordGroup;
    }


}