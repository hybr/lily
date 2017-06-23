import { Component, OnInit } from '@angular/core';
import { DbTableRecordsService } from './service';
import { AppDbCommon } from './common';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder } from '@angular/forms';


@Component({
	selector: 'db-table-records',
	templateUrl: './table_records.html'
})
export class TableRecordsComponent extends AppDbCommon implements OnInit {

	private tableName: string;
	private tableTitle: string;
	private tableStructure: Object = {};

	private searchPattern: string = '';
	private silFields = [];
	constructor (
		public dataService: DbTableRecordsService,
		private route: ActivatedRoute,
		public formBuilder: FormBuilder
	) {
		super(formBuilder, dataService);
	}
	 
	ngOnInit() { 
		this.tableName = this.getParam(this.route, 'tableName', this.tableName);
		this.tableTitle = this.getParam(this.route, 'tableTitle', this.tableTitle);
		console.log('ngOnInit tableName = ', this.tableName);
		this.getTableRecordStructure();
		this.getTableRecordsValue();	
	}
	
	getTableRecordsValue() {
		console.log('getTableRecordsValue tableName = ', this.tableName);
		console.log('getTableRecordsValue searchPattern = ', this.searchPattern);
		this.dataService.readTableRecordValues(this.tableName, this.searchPattern).subscribe(
			response => {
				if (response != undefined && response) { 
					// console.log('getTableRecordsValue response = ', JSON.parse(response.toString()));
					// this.tableValues =  JSON.parse(response.toString())['_items'];
					this.tableValues = response;
				}
				console.log('getTableRecordsValue this.tableValues = ', this.tableValues);
				this.dataLoaded = true;
			},
			error =>  {
				this.errorMessage = <any>error;
				this.dataLoaded = false;
			}
		);
	}

	getTableRecordStructure() {
		console.log('getTableRecordStructure tableName = ', this.tableName);
		console.log('getTableRecordStructure tableTitle = ', this.tableTitle);
		this.dataService.readTableRecordStructure(this.tableTitle).subscribe(
			response => {
				if (response != undefined && response) { 
					this.tableStructure = response;
					console.log('getTableRecordStructure this.tableStructure = ', this.tableStructure);

					let sil = /_sil/;
					for ( let fieldName of this.keysOfObject(this.tableStructure['properties']) ) {
						let defaultValue = this.tableStructure['properties'][fieldName]['default'];
						if ( sil.test(defaultValue) ) {
							this.silFields.push(fieldName);
						}
					}
					console.log('getTableRecordStructure this.silFields = ', this.silFields);
				}
				this.dataLoaded = true;
			},
			error =>  {
				this.errorMessage = <any>error;
				this.dataLoaded = false;
			}
		);
	}

}
