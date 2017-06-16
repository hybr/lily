import { Injectable }              from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/filter";
 
@Injectable()
export class DbTableRecordsService {
	constructor (private http: Http) {}
	
	/* URL to be used */

	private apiDocsUrl() {
		return 'http://localhost:8081/api-docs';
	}

	private recordValueUrl(tableName) {
		console.log('recordValueUrl url = ', 'http://localhost:8080/' + tableName.toLowerCase());
		return 'http://localhost:8080/' + tableName.toLowerCase();
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
		let filtered: Object = {};		
		for(let key of Object.keys(paths)) {
			let tag = paths[key]['get']['tags'][0];
			if ( rE.test(tag)) {
				filtered[tag] = key;
				// console.log('key = ', key);
			}
		}
		// console.log('2 filtered = ', filtered);
		return filtered;
	}

	updateDatabaseTablesList(searchPattern): Observable<any[]> {
		return this.http.get(this.apiDocsUrl())
			.map(response => this.extractStructure(response, searchPattern))
			.catch(this.handleError)
		;
	}

	/* table record structure */

	private extractTableStructure(res: Response, tableTitle) {
		console.log('extractTableStructure res = ', res);
		console.log('extractTableRecords tableTitle = ', tableTitle);

		let definitions = <string[]> res.json()['definitions'];
		console.log('extractTableStructure definitions = ', definitions);

		return definitions[tableTitle];
	}

	updateTableRecordStructure(tableTitle): Observable<any[]> {
		return this.http.get(this.apiDocsUrl())
			.map(response => this.extractTableStructure(response, tableTitle))
			.catch(this.handleError)
		;
	}

	/* table record value */

	private extractTableRecords(res: Response, searchPattern) {
		console.log('extractTableRecords searchPattern = ', searchPattern);
		let items = <string[]> res.json()['_items'];
		console.log('extractTableRecords items = ', items);
		return items;
	}

	public updateTableRecords(tableName, searchPattern): Observable<any[]> {
		return this.http.get(this.recordValueUrl(tableName))
			.map(response => this.extractTableRecords(response, searchPattern))
			.catch(this.handleError)
		;
	}

	/* push record in the table */

	private extractData(res: Response) {
		let body = <string[]> res.json()[1];
		return body || { };
	}

	pushRecord(record: Object = {}, tableName): Observable<any> {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this.recordValueUrl(tableName), { record }, options)
			.map(this.extractData)
			.catch(this.handleError)
		;
	}



}
