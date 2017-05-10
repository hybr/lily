import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable , FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
	selector: 'app-collections-table-record',
	templateUrl: './table-record.component.html',
	styleUrls: ['./table-record.component.css']
})
export class TableRecordComponent implements OnInit {
	public listOfCollToUpdate: FirebaseListObservable<any[]>;
	public docOfCocs: FirebaseObjectObservable<any>;
	public recordStructure: Object = {};
	public title = '';
	public detail = '';

	@Input() recordValues: Object = {};
	@Input() tableNumber: string = 'c2'; /* c1 is table of record structures of all other tables */
	@Input() crudAction: string = 'create';
	@Input() recordKey: string = '';
	@Output() recordValuesUpdated: EventEmitter<any> = new EventEmitter<any>();

	updateFieldValue(fieldName, value) {
		console.log('TableRecordComponent: Received in table record = fieldName ', fieldName, ' value ', value);
		this.recordValues[fieldName] = value[fieldName];
		console.log('TableRecordComponent: Final table record ', this.recordValues);
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
			f6 = default value
			f7 = Does Value Required?
		*/

		for (var key of Object.keys(cocsRecord) ) {

			if (key == 'sorted_field_names') { continue; }
			if (cocsRecord[key]['f1'] == 'sorted_field_names') { continue; }
			if (cocsRecord[key]['f1'] == undefined) { continue; }


			let property = cocsRecord[key]['f1'];

			let field = cocsRecord[key];

			//console.log('field of ', property, ' = ', field);

			let fName = property;
			if (field['f1']) {
				fName = field['f1'];
			}

			let fTitle = fName.split('_').map(i => i[0].toUpperCase() + i.substr(1).toLowerCase()).join(' ');
			if (field['f2']) {
				fTitle = field['f2'];
			}
			let fFieldType = 'field';
			if (field['f3']) {
				fFieldType = field['f3'];
			}

			let fSequence = sequenceCounter;
			sequenceCounter++;
			if (field['f4']) {
				fSequence = parseInt(field['f4']);
			}
			let fValueType = 'string';
			if (field['f5']) {
				fValueType = field['f5'];
			}

			let fDefaultValue = '';
			if (field['f6']) {
				fDefaultValue = field['f6'];
			}

			let fRequired = true;
			if (field['f7']) {
				fRequired = field['f7'];
			}

			let fFkTableName = '';
			if (field['f8']) {
				fFkTableName = field['f8'];
			}

			let fFkTitleFields = '';
			if (field['f9']) {
				fFkTitleFields = field['f9'];
			}

			let fValue = fDefaultValue;
			if (field['v']) {
				fValue = field['v'];
			}

			convertedRecordStructure[fName] = {
				'f1' : fName,
				'f2' : fTitle,
				'f3' : fFieldType,
				'f4' : fSequence,
				'f5' : fValueType,
				'f6' : fDefaultValue,
				'f7' : fRequired,
				'f8' : fFkTableName,
				'f9' : fFkTitleFields
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
		private _af: AngularFireDatabase,
		private _route: ActivatedRoute,
		private _location: Location
	) { }

	ngOnInit() {
		let self = this;

		/* Actual Collection, new record will be pushed in this list */
		self.listOfCollToUpdate = self._af.list('/' + this.tableNumber);
		//console.log('TableRecordComponent: self.listOfCollToUpdate = ', self.listOfCollToUpdate);

		/* Collection Structure of tableNumber */
		const subject = new Subject();

		/* c1 table contains the structures of all other tables */
		const queryObservable = self._af.list('/c1', {
			query: {
			orderByChild: 'a2', /* a2 is field name for collection number */
			equalTo: subject /* collection number to be updated */
			}
		});
		//console.log('TableRecordComponent: queryObservable = ', queryObservable);

		// subscribe to changes
		queryObservable.subscribe(record => {
			/* the result is list of records, so take the first one */
		   this.recordStructure = this.createRecordStructureFromC3Table(record[0]['a5']);
		   this.title = record[0]['a3'];
		   this.detail = record[0]['a4'];
		   if (this.crudAction == 'create') {
				this.recordValues = {};
		   }
		   //console.log('TableRecordComponent: Record for collection number ', this.tableNumber, ' in c1 table is ', this.recordValues);  
		});

		// trigger the query
		subject.next(this.tableNumber);
	}

	convertBeforeSave(rs, fv) {
		console.log('rs =', rs);
		for (var f of rs['sorted_field_names']) {
			console.log('Convertinf field = ' , f);
			if (rs[f]['f5'] == 'password' && fv[f]) {
				fv[f] = Md5.hashStr(fv[f]);
				console.log('RecordFieldComponent: password value changed to ', fv[f])
			}
		}
		return fv;
	}
	onSubmit() {
		console.log('Record value to be saved ', this.recordValues);
		this.recordValues = this.convertBeforeSave(this.recordStructure, this.recordValues);
		console.log('Converted record value to be saved ', this.recordValues);
		if (this.crudAction == 'create') {
			this.listOfCollToUpdate.push(this.recordValues);
		} else if (this.crudAction == 'update') {
			this.listOfCollToUpdate.update(this.recordValues['$key'], this.recordValues);
		} else if (this.crudAction == 'remove') {
			this.listOfCollToUpdate.remove(this.recordValues['$key']);
		}
		// this.route.navigateByUrl('/cocs/list');
		this._location.back();
	} // onSubmit

}
