import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
	selector: 'app-database-update-table-record',
	templateUrl: './update-table-record.component.html',
	styleUrls: ['./update-table-record.component.css']
})
export class UpdateTableRecordComponent implements OnInit {
	public collectionNumber: string = 'c2';
	public recordValue: Object = {};
	public recordKey:string = '';

	constructor(
		private _af: AngularFire,
		private _route: ActivatedRoute
	) { }

	ngOnInit() {
		let self = this;

		this.collectionNumber = this._route.snapshot.paramMap.get('cNum');
		console.log('UpdateTableRecordComponent: this.collectionNumber cNum  =', this.collectionNumber);

		this.recordKey = this._route.snapshot.paramMap.get('docId');
		console.log('UpdateTableRecordComponent: recordKey docId  =', this.recordKey);

		const queryObservable = self._af.database.object(
			'/' + this.collectionNumber + '/' + this.recordKey
		);
		console.log('TableRecordComponent: queryObservable = ', queryObservable);

		// subscribe to changes
		queryObservable.subscribe(record => {
			/* the result is list of records, so take the first one */
			this.recordValue = record;
			console.log('TableRecordComponent: Record value ', this.recordValue, ' in table is ', this.collectionNumber);  
		});

	}

}
