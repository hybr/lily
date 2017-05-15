import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import "rxjs/add/operator/filter";
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-db-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	public dataArrived : boolean = false;
	public errorArrived : boolean = false;
	public queryComplete : boolean = false;
	public response : Object = {};
	public searchPattern: string = '';

	constructor(private _afd: AngularFireDatabase) { }

	ngOnInit() {
		this.searchCollections();
	}

	searchCollections(): void {
		this.dataArrived = false;
		this.errorArrived = false;
		this.queryComplete = false;
		this.response = {};

		const queryObservable = this._afd.list('/c1');

		queryObservable.subscribe(
			dataResponse => { 
				this.dataArrived = true; 
				this.response = dataResponse.filter(
					collection => {
						let rE = new RegExp(this.searchPattern, 'gi');
						return (
							rE.test(collection.a2) 
							|| rE.test(collection.a3) 
							|| rE.test(collection.a4)
						);
					}				
				);
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
