import { Component, OnInit } from '@angular/core';
import { DbTableRecordsService } from './service';

@Component({
	selector: 'db-users-list',
	template: `
		Records: <pre>{{ records | json }}</pre>

	`
})
export class DbUsersListComponent implements OnInit {

	errorMessage: string;
	records: any[];
	mode = 'Observable';
	 
	constructor (private dataService: DbTableRecordsService) {}
	 
	ngOnInit() { this.getRecords(); }
	 
	getRecords() {
		this.dataService.getRecords().subscribe(
			records => this.records = records,
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
