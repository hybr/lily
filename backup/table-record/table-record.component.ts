import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AppDbCommon } from '../common';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs/Subject';



/*import { ListComponent } from './db/list/list.component';
import { UpdateComponent } from './db/update/update.component';
import { TableRecordComponent } from './db/table-record/table-record.component';
import { GroupFieldComponent } from './db/group-field/group-field.component';
import { FieldComponent } from './db/field/field.component';
import { FieldPropertyComponent } from './db/field-property/field-property.component';
import { CreateComponent } from './db/create/create.component';
import { RemoveComponent } from './db/remove/remove.component';*/


/*		TableRecordComponent,
		ListComponent,
		UpdateComponent,
		GroupFieldComponent,
		FieldComponent,
		FieldPropertyComponent,
		CreateComponent,
		RemoveComponent,
*/
@Component({
	selector: 'app-db-table-record',
	templateUrl: './table-record.component.html',
	styleUrls: ['./table-record.component.css']
})
export class TableRecordComponent extends AppDbCommon implements OnInit {
	private loadingRecordStructure: boolean = false;
	private errorWhileloadingRecordStructure: boolean = false;
	private updateInDbStarted: boolean = false;
	private t1Record: Object = {}; /* record from t1 table for the current table */

	public tableRecordStructure: any[] = [];
	public searchPattern: string = '';
	@Input() tableIsUpdated: boolean = false;
	@Input() recordKey: string = ''; // key of tableRecordValues
	@Input() tableRecordValues: Object = {}; // comming from update
	@Input() tableNumber: string = '1'; // comming from update
	@Input() crudAction: string = 'create';
	@Output() tableRecordiIsUpdated: EventEmitter<any> = new EventEmitter<any>();
	@Output() userAction: EventEmitter<any> = new EventEmitter<any>();
	@Output() tableStructure: EventEmitter<any> = new EventEmitter<any>();

	updateRecordValues(value) {
		let obj = this.tableRecordValues;
		//this.tableRecordValues = this.mergeObjects(this.tableRecordValues, value);
		//this.tableRecordValues = value;
		obj = this.mergeObjects(obj, value);
		this.announceIt(
			obj, 
			this.tableRecordiIsUpdated, 
			'TableRecordComponent: updateRecordValues:'
		);
		this.updateInDbStarted = false;
	}

	updateRecordStructure(value) {
		this.tableRecordStructure = value;
		this.updateInDbStarted = false;
		// no need to emit/announce this, save it in table 1

	}
	
	sendUserAction(action) {
		if (action == 'save' && this.tableNumber == this.tableOfTables) {
			/* for t1 table we also save record structure */
			this.updateInDbStarted = true;
			this.tableRecordValues['rs'] = this.tableRecordStructure;
			this.announceIt(
				this.tableRecordValues,
				this.tableRecordiIsUpdated, 
				'TableRecordComponent: updateRecordValues:'
			);
		}
		console.log('this.tableRecordValues = ', this.tableRecordValues);
		this.announceIt(
			action, 
			this.userAction, 
			'TableRecordComponent: sendUserAction:'
		);
	}
	constructor(
		private _afd: AngularFireDatabase,
		private _route: ActivatedRoute
		) { 
		super();
	}

	ngOnInit() {
		this.logIt(['TableRecordComponent: ngOnInit: this.tableNumber ', this.tableNumber]);
			/* Collection Structure of tableNumber */
			const subject = new Subject();

			/* c1 table contains the structures of all other tables */
			const queryObservable = this._afd.list('/' + this.tableOfTables, {
				query: {
					orderByChild: 'f2', /* f1 is field name for collection number */
					equalTo: subject /* collection number to be updated */
				}
			});
			//console.log('TableRecordComponent: queryObservable = ', queryObservable);

			// subscribe to changes
			queryObservable.subscribe(
				recordReceived => {
					this.logIt(['TableRecordComponent: ngOnInit: recordReceived ', this.tableNumberRecordName, recordReceived]);
					/* the result is list of records, so take the first one */
					this.loadingRecordStructure = true;

					if (this.lengthOfVariable(recordReceived) > 0) {
						if (this.tableNumber == this.tableOfTables) {
							this.tableRecordStructure = recordReceived[0]['rs'];
							delete recordReceived[0]['rs'];
						} else {
							this.tableRecordStructure = recordReceived[0]['rs']['f5'];
							delete recordReceived[0]['f5'];
						}
						this.t1Record = recordReceived[0];
					} else {
						this.tableRecordStructure = [];
						this.t1Record = {'f2': '', 'f3': ''};
					}
					this.logIt([
						'TableRecordComponent: ngOnInit: this.tableRecordStructure ', 
						this.tableRecordStructure
					]);
					this.logIt([
						'TableRecordComponent: ngOnInit: this.tableRecordStructure ', 
						this.tableRecordStructure
					]);

					if (this.crudAction == 'create') {
						/* add default values */
						for (var fieldStructure of this.valuesOfList(this.tableRecordStructure)) {
							if (fieldStructure != undefined && fieldStructure['_n'] != undefined && fieldStructure['_d'] != undefined) {
								this.tableRecordValues[fieldStructure['_n']] = fieldStructure['_d'];
							}
						}
					}

					/* announce the field structure to calles (update/create/list) for their use */
					this.announceIt(
						this.tableRecordStructure, 
						this.tableStructure, 
						'TableRecordComponent: ngOnInit: tableStructure'
					);
					
				},
				err => {
					this.errorWhileloadingRecordStructure = true;
					this.tableRecordStructure = err;
				},
				() => {
					this.queryComplete = true;
				}
			);

			// trigger the query
			if (this.tableNumber == this.tableOfTables) {
				subject.next(this.tableRecordValues['f2']);
			} else {
				subject.next(this.tableNumber);
			}
	}

}
