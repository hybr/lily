import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import "rxjs/add/operator/filter";
import { AngularFireDatabase } from 'angularfire2/database';
import { AppDbCommon } from '../common';

@Component({
  selector: 'app-db-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends AppDbCommon implements OnInit {
	public dataArrived : boolean = false;
	public errorArrived : boolean = false;
	public queryComplete : boolean = false;
	public response : Object = {};
	public searchPattern: string = '';

	constructor(
		private _afd: AngularFireDatabase
	) { 
		super();
	}

	ngOnInit() {
		this.searchCollections();
	}

	searchCollections(): void {
		this.dataArrived = false;
		this.errorArrived = false;
		this.queryComplete = false;
		this.response = {};

		const queryObservable = this._afd.list('/' + this.tableOfTables);

		queryObservable.subscribe(
			tableRecords => { 
				this.dataArrived = true; 
				this.response = tableRecords.filter(
					document => {
						// delete document['rs'];
						let rE = new RegExp(this.searchPattern, 'gi');
						return (
							rE.test(document['2']) 
							|| rE.test(document['3']) 
							|| rE.test(document['4'])
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
