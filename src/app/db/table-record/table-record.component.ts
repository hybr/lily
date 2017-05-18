import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AppDbCommon } from '../common';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'app-db-table-record',
	templateUrl: './table-record.component.html',
	styleUrls: ['./table-record.component.css']
})
export class TableRecordComponent extends AppDbCommon implements OnInit {
	public searchPattern: string = '';

	@Input() tableRecord: Object = {};
	@Input() tableNumber: string = 'c2'; /* c1 is table of record structures of all other tables */
	@Input() crudAction: string = 'create';
	@Input() recordKey: string = '';
	@Output() tableRecordUpdated: EventEmitter<any> = new EventEmitter<any>();

	updateRecordValues(fieldName, value) {
		this.logIt([
			'TableRecordComponent: updateRecordValues: ',
			' fieldName = ', fieldName, 
			' value = ', value
		]);
	}
	

	constructor(
		private _afd: AngularFireDatabase,
		private _route: ActivatedRoute
		) { 
		super();
	}


	ngOnInit() {
		/* Collection Structure of tableNumber */
		const subject = new Subject();

		/* c1 table contains the structures of all other tables */
		const queryObservable = this._afd.list('/c1', {
			query: {
				orderByChild: 'a2', /* a2 is field name for collection number */
				equalTo: subject /* collection number to be updated */
			}
		});
		//console.log('TableRecordComponent: queryObservable = ', queryObservable);

		// subscribe to changes
		queryObservable.subscribe(
			recordReceived => {
				/* the result is list of records, so take the first one */
				this.dataArrived = true;
				this.response = recordReceived[0]['a5'];
/*				let r = {
					a1: true,
					a2: 'c1',
					a3: 'Tables',
					a4: 'list of tables',
					a5: {

						a1: { 
							n: 'a1',
							t: 'Is Table Active?',
							y: 'boolean',
							d: true,
							s: 1,
							f: true,
							a: '',
							b: '',
							m: 0
						},
						a2: { 
							n: 'a2',
							t: 'Table Name',
							y: 'string',
							d: '',
							s: 3,
							f: true,
							a: '',
							b: '',
							m: 0
						},
						a3: { 
							n: 'a3',
							t: 'Table Number',
							y: 'string',
							d: true,
							s: 2,
							f: true,
							a: '',
							b: '',
							m: 0
						},
						a4: { 
							n: 'a4',
							t: 'Detail',
							y: 'string',
							d: '',
							s: 4,
							f: true,
							a: '',
							b: '',
							m: 0
						},
						a5: { 
							n: 'a5',
							t: 'Record Structure',
							y: 'string',
							d: '',
							s: 5,
							f: false,
							a: '',
							b: '',
							m: 1,
							0: {
								n: 'n',
								t: 'Name',
								y: 'string',
								d: '',
								s: 1,
								f: true,
								a: '',
								b: '',
								m: 0
							},
							1: {
								n: 't',
								t: 'Type',
								y: 'string',
								d: '',
								s: 2,
								f: true,
								a: '',
								b: '',
								m: 0
							},
							2: {
								n: 'y',
								t: 'Value Type',
								y: 'string',
								d: '',
								s: 3,
								f: true,
								a: '',
								b: '',
								m: 0
							},

						},
					}
				}
				;*/

				this.record = this.response = {};
			},
			err => {
				this.errorArrived = true;
				this.response = err;
			},
			() => {
				this.queryComplete = true;
			}
			);

		// trigger the query
		subject.next(this.tableNumber);
	}

}
