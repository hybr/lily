

export class AppCommon {
	public debug: boolean = true;

	public dataArrived: boolean = false;
	public errorArrived: boolean = false;
	public queryComplete: boolean = false;
	public response: Object = {};
	
	constructor() { }

	// sleep time expects milliseconds
	sleep(milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds){
				break;
			}
		}
	} /* sleep */
	
	keysOfObject(obj) {
		if (obj == undefined) {
			return [];
		} else {
			return Object.keys(obj);	
		}
	} /* keysOfObject */

	isVariableObject(v) {
		return (v !== null && typeof v === 'object');
		// (v.constructor === Object)
	} /* isVariableObject */

	isVariableArray(v) {
		return (Object.prototype.toString.call(v) === '[object Array]');
		// (a.constructor === Array)
	}

	lengthOfVariable(list) {
		if (this.isVariableObject(list)) return Object.keys(list).length;
		if (this.isVariableArray(list)) return list.length;
		return 0;
	}

	isVariableEmpty(list) {
		return (this.lengthOfVariable(list) == 0);
	}

	doesKeyExists(key, list) {
		if (this.isVariableObject(list)) return (key in list);
		if (this.isVariableArray(list)) return (this.lengthOfVariable(list) >= key);
		// if (this.isVariableObject(obj)) return obj.hasOwnProperty(key);
		return false;
	}
	
	valuesOfList(list) {
		if (this.isVariableObject(list)) {
			let rs = [];
			for(let key of this.keysOfObject(list)) {
				// this.logIt(['found in list', key, list[key] ]);
				rs.push(list[key]);
			}
			return rs;
		}
		if (this.isVariableArray(list)) {
		 	return list;
		}
		return [];
	} /* valuesOfList */

	typeOfVariable(v) {
		return typeof v;
	}
	
	logIt(messages) {
		this.debug && console.log('===== LogIt', JSON.stringify(messages));
	} /* debug */
}