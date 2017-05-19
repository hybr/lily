import { Component } from '@angular/core';
import { AppCommon } from '../common';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
	selector: 'app-db-common',
	templateUrl: './common'
})
export class AppDbCommon extends AppCommon {
	
	constructor() {
		super();
	}


	getParam(r, param, paramValue) {
		this.dataArrived = false;
		this.errorArrived = false;
		this.queryComplete = false;
		this.response = {};

		if (param == undefined) {
			this.errorArrived = true;
			paramValue = 'DB_CO-ERROR-PARAMETER_IS_UNDEFINED';
		}
		this.debug && console.log([
			'AppDbCommon before gettin '+param+' from url ', 
			paramValue
		]);
		if (paramValue == undefined && r  ) {
			this.debug && console.log([
				'AppDbCommon snapsht is ok',
				r
			]);
			paramValue = r.snapshot.paramMap.get(param);
			this.dataArrived = true;
		}
		this.debug && console.log([
			'AppDbCommon after gettin ' + param + ' from url ',
			paramValue
		]);
		if (paramValue == undefined) {
			this.errorArrived = true;
			paramValue = 'DB_CO-ERROR-GETTING_PARAM_VALUE-' + param;	
		}
		this.debug && console.log([
			'AppDbCommon final ' + param + ' from url ', 
			paramValue
		]);

		return paramValue;
	} /* getParam */

}