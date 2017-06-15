import { Component, OnInit } from '@angular/core';
import { DbTableRecordsService } from './service';
import { AppDbCommon } from './common';

@Component({
	selector: 'db-tables-list',
	templateUrl: './db.html'
})
export class DbTablesComponent extends AppDbCommon implements OnInit {

	errorMessage: string;
	records: any[];
	mode = 'Observable';
	dataArrived: boolean = false;

	constructor (private dataService: DbTableRecordsService) {
		super();
	}
	 
	ngOnInit() { this.getRecordStructure(); }
	 
	getRecordStructure() {
		this.dataService.getRecordStructure().subscribe(
			records => {
				this.records = records;
				this.dataArrived = true;
			},
			error =>  this.errorMessage = <any>error
		);
	}
	 
	addRecord(record: Object = {}) {
		if (!record) { return; }
		this.dataService.pushRecord(record).subscribe(
			r  => this.records.push(r),
			error =>  this.errorMessage = <any>error);
	}
}
