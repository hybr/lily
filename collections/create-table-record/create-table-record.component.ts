import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create-table-record',
  templateUrl: './create-table-record.component.html',
  styleUrls: ['./create-table-record.component.css']
})
export class CreateTableRecordComponent implements OnInit {

	public collectionNumber: string = 'c2';
  public recordValue: Object = {};
  constructor(
  	private _route: ActivatedRoute
  ) { }

  ngOnInit() {

		this.collectionNumber = this._route.snapshot.paramMap.get('cNum');
		//console.log('TableRecordComponent: this.collectionNumber cNum  =', this.collectionNumber);
  }

}
