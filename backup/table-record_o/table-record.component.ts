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

	createRecordStructureFromC3Table(f, cocsRecord = {}) {
		console.log('########################################');
		console.log('cocsRecord received ', 'for field ', f, ' = ', cocsRecord);

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
/*		if (Object.keys(cocsRecord).length == 1) {
			console.log('No fields in ', cocsRecord);
			cocsRecord['a1'] = { 'f1':  'a1', 'f3' : 'field', 'f4' : 1};
		}*/
		var field : Object = {};

		for (let key of Object.keys(cocsRecord)) {
			if (cocsRecord[key]['f1'] == 'sorted_field_names') { continue; }
			if (cocsRecord[key]['f1'] == undefined) { continue; }

			field = cocsRecord[key];

			if (field['f1'] == undefined) { field['f1'] = 'x'; }
			
			console.log('field of ', field['f1'], ' = ', field);

			if (field['f2'] == undefined) {
				field['f2'] = field['f1'].split('_').map(i => i[0].toUpperCase() + i.substr(1).toLowerCase()).join(' ');;
			}

			if (field['f3'] == undefined) { field['f3'] = 'field'; }

			if (field['f4'] == undefined) { field['f4'] = sequenceCounter++; }
			field['f4'] = parseInt(field['f4']);

			if (field['f5'] == undefined) { field['f5'] = 'string'; }

			if (field['f6'] == undefined) { field['f6'] = ''; }

			if (field['f7'] == undefined) { field['f7'] = true; }

			if (field['f8'] == undefined) { field['f8'] = ''; }

			if (field['f9'] == undefined ) { field['f9'] = ''; }

			var resultObj : Object  = {};
			if (field['f3']  == 'field_group') {
				console.log('Converting ', field);
				if (field[0] == undefined || field[0]['f1'] == undefined) { 
					field[0] = { 'f1' : 'a1'}
				}
				resultObj = this.createRecordStructureFromC3Table(
					field['f1'], field
 				);
				console.log('keys in result = ', resultObj);

				field['fields'] = resultObj;
			}

			//console.log('==============================');

		} /* for */

		let localFields = [];
		/* create array of field objects for sequence sorting */
		console.log('Convereted structure  = ', field)
		for (var k2 of Object.keys(field)) {
			localFields.push(field[k2]);
		}

		/* sort based on sequence field f4 */
		localFields.sort(function(a, b) { 
			if (a.f4 < b.f4) return -1;
			if (a.f4 > b.f4) return 1;
			return 0;
		});
    	console.log('sorted localFields ', localFields);

		/* store sorted field names */
		field['sorted_field_names'] = [];

		localFields.forEach(function(fieldObject) {
			console.log('Push ', fieldObject['f1'], ' in sorted_field_names in ', field['sorted_field_names']);
			field['sorted_field_names'].push(fieldObject['f1']);
		});

		/* free up memory */
		// delete localFields; TODO can not delete with defined as var/let
		console.log('---------------------------');
		return field;
		
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
		queryObservable.subscribe(
			record => {
			/* the result is list of records, so take the first one */
		   this.recordStructure = this.createRecordStructureFromC3Table('main', record[0]['a5']);
		   this.title = record[0]['a3'];
		   this.detail = record[0]['a4'];
		   if (this.crudAction == 'create') {
				this.recordValues = {};
		   }
		   //console.log('TableRecordComponent: Record for collection number ', this.tableNumber, ' in c1 table is ', this.recordValues);  
			},
			err => {
				alert(err);
			}
		);

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
