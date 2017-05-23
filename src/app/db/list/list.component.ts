import { Component, OnInit, Compiler } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import "rxjs/add/operator/filter";
import { AngularFireDatabase } from 'angularfire2/database';
import { AppDbCommon } from '../common';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-db-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends AppDbCommon implements OnInit {
	private collectionNumber: string;
	private title: string = 'List of Tables or Collections in Database';
	public dataArrived : boolean = false;
	public errorArrived : boolean = false;
	public queryComplete : boolean = false;
	public response : Object = {};
	public searchPattern: string = '';

	constructor(
		private _afd: AngularFireDatabase,
		private _route: ActivatedRoute,
		private _compiler: Compiler
	) { 
		super();
		this._compiler.clearCache();
	}

	ngOnInit() {
		this.collectionNumber = this.getParam(this._route, 'cNum', this.collectionNumber);
		this.logIt(['ListComponent: ngOnInit: collectionNumber 1 ', this.collectionNumber]);
		if (this.collectionNumber == undefined || this.collectionNumber == '' || this.collectionNumber == null || this.collectionNumber == 'DB_CO-ERROR-GETTING_PARAM_VALUE-cNum') {
			this.collectionNumber = this.tableOfTables;
		}
		this.logIt(['ListComponent: ngOnInit: collectionNumber 2 ', this.collectionNumber]);
		if (this.collectionNumber != this.tableOfTables) {
			this.title = 'Table ' + this.collectionNumber;
		}
		this.searchCollections();
	}

	searchCollections(): void {
		this.dataArrived = false;
		this.errorArrived = false;
		this.queryComplete = false;
		this.response = {};

		const queryObservable = this._afd.list('/' + this.collectionNumber);

		queryObservable.subscribe(
			tableRecords => { 
				this.dataArrived = true; 
				this.response = tableRecords.filter(
					document => {
						// delete document['rs'];
						let rE = new RegExp(this.searchPattern, 'gi');
						return (
							rE.test(document['1']) 
							|| rE.test(document['2']) 
							|| rE.test(document['3'])
						);
					}				
				);
				this.logIt(['ListComponent: response ', this.response]);
			},
			errorResponse => {
				this.errorArrived = true;
				this.response = errorResponse;
			},
			() => {
				this.queryComplete = true;
			}
		);
	} /* searchCollections */

}
