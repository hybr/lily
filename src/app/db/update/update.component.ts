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
	private updatedInDb: boolean = false;

	private updateDataArrived = false;
	private updateErrorArrived = false;
	private updateQueryComplete = false;
	private updateResponse = {};

	@Input() collectionNumber: string;
	@Input() recordKey: string;

	constructor(
		private _afd: AngularFireDatabase,
		private _route: ActivatedRoute
	) {
		super();
	}

	updatedRecord(updatedRecord) {
		this.logIt([
			'UpdateComponent: updatedRecord: ',
			' record to be saved = ', updatedRecord
		]);
		this.updateResponse = updatedRecord;
		this.updatedInDb = false;
	}

	takeAction(action) {
		if (action == 'save') {
			this.logIt([
				'UpdateComponent: takeAction: ',
				'saved = ', this.updateResponse, ' key ', this.recordKey
			]);
			const queryObservable = this._afd.object(
				'/' + this.collectionNumber + '/' + this.recordKey
			);
			queryObservable.update(this.updateResponse);
			this.updatedInDb = true;
		}
	}

	searchCollections(): void {
		const queryObservable = this._afd.object(
			'/' + this.collectionNumber + '/' + this.recordKey
		);

		queryObservable.subscribe(
			dataResponse => { 
				this.updateDataArrived = true; 
				this.updateResponse = dataResponse;
				this.logIt(['UpdateComponent: searchCollections: recordValue ', this.updateResponse]);
				delete this.updateResponse['rs'];
			},
			errorResponse => {
				this.updateErrorArrived = true;
				this.updateResponse = errorResponse;
			},
			() => {
				this.updateQueryComplete = true;
			}
		);
	} /* searchCollections */

	ngOnInit() {
		this.collectionNumber = this.getParam(this._route, 'cNum', this.collectionNumber);
		this.recordKey = this.getParam(this._route, 'docId', this.recordKey);
		this.updatedInDb = false;
		if (!this.errorArrived) { 
			this.searchCollections();
		} else {
			this.logIt(['UpdateComponent: ngOnInit: errorArrived ', this.errorArrived]);
		}
	} /* ngOnInit */
}
