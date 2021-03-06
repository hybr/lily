import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/filter";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-database-tables',
  templateUrl: './list-database-tables.component.html',
  styleUrls: ['./list-database-tables.component.css']
})
export class ListDatabaseTablesComponent implements OnInit {

	public listOfCocs: Observable<any[]>;
	public searchPattern: string = '';

	constructor(
		private _af: AngularFireDatabase
	) {}

	ngOnInit() {
		this.searchCollections();
	};

	searchCollections(): void {
		this.listOfCocs = this._af.list('/c1')
		.map(
			collections => collections.filter(
				collection => {
					let rE = new RegExp(this.searchPattern, 'gi');
					return (rE.test(collection.a2) 
						|| rE.test(collection.a3) 
						|| rE.test(collection.a4));
				}
			)
		);
	}

}
