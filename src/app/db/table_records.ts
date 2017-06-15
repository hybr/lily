import { Component, OnInit } from '@angular/core';
import { DbTableRecordsService } from './service';
import { AppDbCommon } from './common';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'db-table-records',
	templateUrl: './table_records.html'
})
export class TableRecordsComponent extends AppDbCommon implements OnInit {

	private errorMessage: string = '';
	private tableName: string;
	private tableStructure: Object = {};
	private tableValues: any[] = [];

	private dataLoaded: boolean = false;
	private searchPattern: string = '';

	constructor (
		private dataService: DbTableRecordsService,
		private route: ActivatedRoute
	) {
		super();
	}
	 
	ngOnInit() { 
		this.tableName = this.getParam(this.route, 'tableName', this.tableName);
		console.log('tableName = ', this.tableName);
		this.getRecordValues();
		this.getRecordStructure();
	}
	
	getRecordValues() {
		// console.log('1 searchPattern = ', this.searchPattern);
		this.dataService.updateTableRecords(this.tableName, this.searchPattern).subscribe(
			response => {
				console.log('1 response = ', JSON.parse(response.toString()));
				this.tableValues =  JSON.parse(response.toString())['_items'];
				console.log('this.tableValues = ', this.tableValues);
				this.dataLoaded = true;
			},
			error =>  {
				this.errorMessage = <any>error;
				this.dataLoaded = false;
			}
		);
	}

	getRecordStructure() {
		// console.log('1 searchPattern = ', this.searchPattern);
		this.dataService.updateTableStructure(this.tableName).subscribe(
			response => {
				this.tableStructure = JSON.parse(response.toString());
				// console.log('this.tables = ', this.tables);
				this.dataLoaded = true;
			},
			error =>  {
				this.errorMessage = <any>error;
				this.dataLoaded = false;
			}
		);
	}

}
