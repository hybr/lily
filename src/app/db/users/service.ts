import { Injectable }              from '@angular/core';
import { Http, Response, Headers, RequestOptions, Jsonp, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
 
@Injectable()
export class DbTableRecordsService {
	private recordsUrl = 'hybr.in:8081/users';  // URL to web API

	constructor (private http: Http, private jsonp: Jsonp) {}
	 
	getRecords(): Observable<any[]> {
		let params = new URLSearchParams();
		params.set('format', 'json');
		params.set('callback', 'JSONP_CALLBACK');

		return this.jsonp.get(this.recordsUrl, params)
		.map(this.extractData)
		.catch(this.handleError);
	}

	pushRecord(record: Object = {}): Observable<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.jsonp.post(this.recordsUrl, { record }, options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	private extractData(res: Response) {
		let body = <string[]> res.json()[1];
		return body || { };
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
		console.error(errMsg);
		return Observable.throw(errMsg);
	}

}
