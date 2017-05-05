import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-collections-table-record',
	templateUrl: './table-record.component.html',
	styleUrls: ['./table-record.component.css']
})
export class TableRecordComponent implements OnInit {
	public listOfCollToUpdate: FirebaseListObservable<any[]>;
	public docOfCocs: FirebaseObjectObservable<any>;
	public recordStructure: Object = {};
	public cA = '';
	public title = '';

	@Input() recordValues : Object  = {};
	@Input() tableNumber: string = 'c2'; /* c1 is table of record structures of all other tables */
	@Input() crudAction: string = 'create';
	@Output() recordValuesUpdated: EventEmitter<any> = new EventEmitter<any>();

	updateFieldValue(fieldName, value) {
		//console.log('Received in table record = fieldName ', fieldName, ' value ', value);
		this.recordValues[fieldName] = value[fieldName];
	}

	createRecordStructureFromC3Table(cocsRecord) {
		//console.log('########################################');
		//console.log('cocsRecord received = ', cocsRecord);

		let convertedRecordStructure: Object = {};

		let sequenceCounter = 1;
		/* 
			f1 = name 
			f2 = title
			f3 = field_type
			f4 = sequence
			f5 = value_type
		*/

		for (var key of Object.keys(cocsRecord) ) {

			if (key == 'sorted_field_names') { continue; }
			if (cocsRecord[key]['f1'] == 'sorted_field_names') { continue; }
			if (cocsRecord[key]['f1'] == undefined) { continue; }


			let property = cocsRecord[key]['f1'];

			let field = cocsRecord[key];

			//console.log('field of ', property, ' = ', field);

			let fFieldType = 'field';
			if (field['f3']) {
				fFieldType = field['f3'];
			}

			let fName = property;
			if (field['f1']) {
				fName = field['f1'];
			}

			let fDefaultValue = '';
			if (field['default_value']) {
				fDefaultValue = field['default_value'];
			}

			let fValue = fDefaultValue;
			if (field['v']) {
				fValue = field['v'];
			}

			let fValueType = 'string';
			if (field['f5']) {
				fValueType = field['f5'];
			}

			let fTitle = fName.split('_').map(i => i[0].toUpperCase() + i.substr(1).toLowerCase()).join(' ');
			if (field['f2']) {
				fTitle = field['f2'];
			}

			let fSequence = sequenceCounter;
			sequenceCounter++;
			if (field['f4']) {
				fSequence = parseInt(field['f4']);
			}

			convertedRecordStructure[fName] = {
				'f1' : fName,
				'f2' : fTitle,
				'f3' : fFieldType,
				'f4' : fSequence,
				'f5' : fValueType
			};

			var resultObj : Object  = {};
			if (fFieldType == 'field_group') {
				resultObj = this.createRecordStructureFromC3Table(
					field
				);
				convertedRecordStructure[fName]['fields'] = resultObj;
			}

			//console.log('==============================');

		} /* for */

		let localFields = [];
		/* create array of field objects */
		for (var k2 of Object.keys(convertedRecordStructure)) {
			localFields.push(convertedRecordStructure[k2]);
		}
		/* sort based on sequence field f4 */
		localFields.sort(function(a, b) { 
			if (a.f4 < b.f4) return -1;
			if (a.f4 > b.f4) return 1;
			return 0;
		});
    	//console.log('sorted localFields ', localFields, ' of convertedRecordStructure ', convertedRecordStructure);

		/* store sorted field names */
		convertedRecordStructure['sorted_field_names'] = [];
		localFields.forEach(function(fieldObject) {
			//console.log('Push ', fieldObject['f1'], ' in sorted_field_names in ', convertedRecordStructure['sorted_field_names']);
			convertedRecordStructure['sorted_field_names'].push(fieldObject['f1']);
		});
		/* free up memory */
		// delete localFields; TODO can not delete with defined as var/let
		//console.log('---------------------------');
		return convertedRecordStructure;
	} /* createRecordStructureFromC3Table */

	constructor(
		private _af: AngularFire,
		private _route: ActivatedRoute,
		private _location: Location
	) { }

	ngOnInit() {
		let self = this;

		/* Actual Collection, new record will be pushed in this list */
		self.listOfCollToUpdate = self._af.database.list('/' + this.tableNumber);
		console.log('TableRecordComponent: self.listOfCollToUpdate = ', self.listOfCollToUpdate);

		/* Collection Structure of tableNumber */
		const subject = new Subject();

		/* c1 table contains the structures of all other tables */
		const queryObservable = self._af.database.list('/c1', {
			query: {
			orderByChild: 'a2', /* a2 is field name for collection number */
			equalTo: subject /* collection number to be updated */
			}
		});
		console.log('TableRecordComponent: queryObservable = ', queryObservable);

		// subscribe to changes
		queryObservable.subscribe(record => {
			/* the result is list of records, so take the first one */
		   this.recordStructure = this.createRecordStructureFromC3Table(record[0]['a5']);
		   this.title = record[0]['a3'];
		   this.cA = this.crudAction;
		   console.log('TableRecordComponent: Record for collection number ', this.tableNumber, ' in c1 table is ', this.recordValues);  
		});

		// trigger the query
		subject.next(this.tableNumber);
	}

	onSubmit() {
		this.listOfCollToUpdate.push(this.recordValues);
		// this.route.navigateByUrl('/cocs/list');
		this._location.back();
	} // onSubmit

}
