import { Component, OnInit, Input } from '@angular/core';
import { AppDbCommon } from '../common';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-db-update',
	templateUrl: './update.component.html',
	styleUrls: ['./update.component.css']
})
export class UpdateComponent extends AppDbCommon implements OnInit {

	public searchPattern: string = '';

	@Input() collectionNumber: string;
	@Input() recordKey: string;

	constructor(
		private _afd: AngularFireDatabase,
		private _route: ActivatedRoute
	) {
		super();
	}

	searchCollections(): void {
		this.dataArrived = false;
		this.errorArrived = false;
		this.queryComplete = false;
		this.response = {};

		const queryObservable = this._afd.object(
			'/' + this.collectionNumber + '/' + this.recordKey
		);

		queryObservable.subscribe(
			dataResponse => { 
				this.dataArrived = true; 
				this.response = dataResponse;
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

	ngOnInit() {
		this.collectionNumber = this.getParam(this._route, 'cNum', this.collectionNumber);
		this.recordKey = this.getParam(this._route, 'docId', this.recordKey);
		if (!this.errorArrived) { 
			this.searchCollections();
		}
	} /* ngOnInit */


}
