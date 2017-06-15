import { Component, OnInit } from '@angular/core';
import { DbTableRecordsService } from './service';
import { AppDbCommon } from './common';

@Component({
	selector: 'db-tables',
	templateUrl: './db_tables.html'
})
export class DbTablesComponent extends AppDbCommon implements OnInit {

	private errorMessage: string = '';
	private tables: any[] = [];
	private dataLoaded: boolean = false;
	private searchPattern: string = '';

	constructor (private dataService: DbTableRecordsService) {
		super();
	}
	 
	ngOnInit() { this.getRecordStructure(); }
	 
	getRecordStructure() {
		// console.log('1 searchPattern = ', this.searchPattern);
		this.dataService.updateDatabaseStructure(this.searchPattern).subscribe(
			response => {
				this.tables = response;
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
