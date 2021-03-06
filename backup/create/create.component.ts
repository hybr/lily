import { Component, OnInit, Input } from '@angular/core';
import { AppDbCommon } from '../common';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent extends AppDbCommon implements OnInit {

	private createResponse: Object = {};
	private updatedInDb: boolean = false;
	private tableStructure: Object = {};

	@Input() collectionNumber: string;

	constructor(
		private _afd: AngularFireDatabase,
		private _route: ActivatedRoute
	) {
		super();
	}

	updateTableStructure(ts) {
		this.tableStructure = ts;
	}
	
	updatedRecord(updatedRecord) {
		this.logIt([
			'CreateComponent: updatedRecord: ',
			' record to be saved = ', updatedRecord
		]);
		this.createResponse = this.mergeObjects(this.createResponse, updatedRecord);
		this.updatedInDb = false;
	}

	takeAction(action) {
		if (action == 'save') {
			this.logIt([
				'CreateComponent: takeAction: ',
				'saved = ', this.createResponse
			]);
			//console.log('this.createResponse = ', this.createResponse);
			const queryObservable = this._afd.list('/' + this.collectionNumber);
			queryObservable.push(this.createResponse);
			this.updatedInDb = true;
		}
	}

	ngOnInit() {
		this.collectionNumber = this.getParam(this._route, 'cNum', this.collectionNumber);
		this.createResponse = {};
	} /* ngOnInit */


}
