import { Injectable }              from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/filter";
 
@Injectable()
export class DbTableRecordsService {
	private recordsUrl = 'http://localhost:8081/api-docs';  // URL to web API
	private searchPattern: string = '';
	constructor (private http: Http) {}
	 
	private extractStructure(res: Response, rS) {
		// console.log('3 searchPattern = ', this.searchPattern);

		let body = <string[]> res.json()['paths'];
		// console.log('1 body = ', body);
		if (this.searchPattern == undefined || this.searchPattern == '') {
			this.searchPattern = '.*';
		}
		let rE = new RegExp(this.searchPattern, 'gi');
		let filtered: Object = {};		
		for(let key of Object.keys(body)) {
			let tag = body[key]['get']['tags'][0];
			if ( rE.test(tag)) {
				filtered[tag] = key;
				// console.log('key = ', key);
			}
		}
		// console.log('2 filtered = ', filtered);
		return filtered;
	}

	updateDatabaseStructure(searchPattern): Observable<any[]> {
		let url = 'http://localhost:8081/api-docs';
		this.searchPattern = searchPattern;
		// console.log('2 searchPattern = ', this.searchPattern);

		return this.http.get(url)
			.map(response => this.extractStructure(response, this.searchPattern))
			.catch(this.handleError)
		;
	}

	private extractTableStructure(res: Response, tableName) {
		console.log('extractTableStructure res = ', res.json()['definitions']);
		let ts = res.json()['definitions'];
		return <string[]> ts[tableName];
	}

	updateTableStructure(tableName): Observable<any[]> {
		let url = 'http://localhost:8081/api-docs';
		return this.http.get(url)
			.map(response => this.extractTableStructure(response, tableName))
			.catch(this.handleError)
		;
	}

	private extractTableRecords(res: Response, searchPattern) {
		console.log('res = ', res.json()['_body']);
		return res.json()['_body'];
	}

	public updateTableRecords(tableName, searchPattern): Observable<any[]> {
		let url = 'http://localhost:8080/' + tableName.toLowerCase();
		this.searchPattern = searchPattern;
		console.log('updateTableRecords searchPattern = ', this.searchPattern);
		console.log('updateTableRecords url = ', url);

		return this.http.get(url)
			.map(this.extractTableRecords)
			.catch(this.handleError)
		;
	}



	private extractData(res: Response) {
		let body = <string[]> res.json()[1];
		return body || { };
	}

	getRecords(): Observable<any[]> {
		return this.http.get(this.recordsUrl)
			.map(this.extractData)
			.catch(this.handleError)
		;
	}

	pushRecord(record: Object = {}): Observable<any> {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this.recordsUrl, { record }, options)
			.map(this.extractData)
			.catch(this.handleError)
		;
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

}
