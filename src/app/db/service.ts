import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/filter";
 
@Injectable()
export class DbTableRecordsService {
	private headers: Headers;
	private requestOptions: RequestOptions;

	constructor (private http: Http) {
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/json');

		this.requestOptions = new RequestOptions({ 
			'headers': this.headers 
		});
	}
	
	/* URL to be used */

	private apiDocsUrl() {
		return 'http://localhost:8081/api-docs';
	}

	private recordValueUrl(tableName = '', id = '') {
		let url = '';
		url = 'http://localhost:8080';
		if (tableName && tableName != '') {
			url = url + '/' + tableName.toLowerCase();
		}
		if (id && id != '') {
			url = url + '/' + id.toLowerCase();
		}		
		// console.log('recordValueUrl url = ', url);
		return url;
	}

	private handleError (error: Response | any) {
		// In a real world app, you might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		return Observable.throw(errMsg);
	}

	/* database tables list */

	private extractStructure(res: Response, searchPattern) {
		let paths = <string[]> res.json()['paths'];
		if (searchPattern == undefined || searchPattern == '') {
			searchPattern = '.*'; /* all tables */
		}
		let rE = new RegExp(searchPattern, 'gi');
		let id = new RegExp('Id}', 'g');
		let filtered = [];		
		for(let key of Object.keys(paths)) {
			let tag = paths[key]['get']['tags'][0];
			if ( rE.test(tag) && (!id.test(key)) ) {
				let obj = {};
				obj['title'] = tag;
				obj['path'] = key;
				filtered.push(obj);
				// // console.log('key = ', key);
			}
		}
		// // console.log('2 filtered = ', filtered);
		return filtered;
	}

	public readDatabaseTablesList(searchPattern): Observable<any[]> {
		return this.http.get(this.apiDocsUrl())
			.map(response => this.extractStructure(response, searchPattern))
			.catch(this.handleError)
		;
	}

	/* table record structure */

	private extractTableStructure(res: Response, tableTitle) {
		// console.log('extractTableStructure res = ', res);
		// console.log('extractTableRecords tableTitle = ', tableTitle);

		let definitions = <string[]> res.json()['definitions'];
		// console.log('extractTableStructure definitions = ', definitions);

		return definitions[tableTitle];
	}

	readTableRecordStructure(tableTitle): Observable<any[]> {
		return this.http.get(this.apiDocsUrl(), {headers: this.headers})
			.map(response => this.extractTableStructure(response, tableTitle))
			.catch(this.handleError)
		;
	}

	/* table record value */

	private extractTableRecords(res: Response, searchPattern) {
		// console.log('extractTableRecords searchPattern = ', searchPattern);
		//TODO implement search patteren
		let items = <string[]> res.json()['_items'];
		// console.log('extractTableRecords items = ', items);
		return items;
	}

	public readTableRecordValues(tableName, searchPattern): Observable<any[]> {
		return this.http.get(this.recordValueUrl(tableName), {headers: this.headers})
			.map(response => this.extractTableRecords(response, searchPattern))
			.catch(this.handleError)
		;
	}

	/* push record in the table */

	private extractsaveRecordData(res: Response) {
		let status = <string[]> res.json()['_status'];
		return status || { };
	}

	saveRecord(record: Object, tableName): Observable<any> {
		if (!record) {
			return null;
		}
		// console.log('saveRecord record = ', record);
		return this.http.post(this.recordValueUrl(tableName), record, {headers: this.headers})
			.map(this.extractsaveRecordData)
		;
	}

	/* update record in the table */

	private extractupdateRecordData(res: Response) {
		let status = <string[]> res.json()['_status'];
		return status || { };
	}

	updateRecord(record: Object, tableName): Observable<any> {
		if (!record) {
			return null;
		}

		this.headers.set('If-Match', record['_etag']);
		let id = record['_id'];

		delete record['_etag']; // do not save it in record
		delete record['_id']; // do not save it in record

		// console.log('updateRecord record = ', record);


		return this.http.patch(this.recordValueUrl(tableName, id), JSON.stringify(record), {headers: this.headers})
			.map(this.extractupdateRecordData)
		;
	}

	/* delete record */

    private extractdeleteRecordData(res: Response) {
        let body = res.json();
        return body || {};
    }


	deleteRecord(record: Object, tableName): Observable<any> {
		this.headers.set('If-Match', record['_etag']);
		// console.log('deleteRecord record = ', record);
		return this.http.delete(this.recordValueUrl(tableName, record['_id']), {headers: this.headers})
			.map(this.extractdeleteRecordData)
			.catch(this.handleError);
		;
	}
}
