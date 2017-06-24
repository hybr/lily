

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

	doesValueExists(value, list) {
		// if (this.isVariableObject(list)) return (Object.values(list).indexOf(value) > -1);
		if (this.isVariableObject(list)) {
			Object.keys(list).forEach(function(key) {
  				if (list[key] == value) return true;
			})
		}
		if (this.isVariableArray(list)) return (list.indexOf(value) > -1);
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

	mergeObjects(obj1, obj2) {
		let obj3;

		if (obj1 == undefined) {
			if (obj2 == undefined) {
				return {};
			} else { 
				return obj2;
			}
		}

		if (obj2 == undefined) {
			return obj1;
		}

		if (this.isVariableArray(obj1)) {
			obj3 = [];
			for (let e1 of obj1) {
				obj3.push(e1);
			}
			if (this.isVariableArray(obj2)) {
				for(let e2 of obj2) { 
					obj3.push(e2);
				}
			} else if (this.isVariableObject(obj2)) {
				for(let e2 of Object.keys(obj2)) { 
					obj3.push(obj2[e2]);
				}
			} else {
				obj3.push(obj2);
			}
		}

		if (this.isVariableObject(obj1)) {
			obj3 = {};
			for (let e1 of Object.keys(obj1)) {
				obj3[e1] = obj1[e1];
			}
			if (this.isVariableArray(obj2)) {
				let i2 = 0;
				for(let e2 of obj2) { 
					obj3.push(e2);
					i2++;
				}
			} else if (this.isVariableObject(obj2)) {
				for(let e2 of Object.keys(obj2)) { 
					if (this.isVariableArray(obj2[e2]) || this.isVariableObject(obj2[e2])) {
						obj3[e2] = this.mergeObjects(obj3[e2], obj2[e2]);
					} else {
						obj3[e2] = obj3[e2] + <string>obj2[e2];	
					}
				}
			} else {
				obj3[0] = obj2;
			}
		}

		// Object.assign(obj3, obj1, obj2);
		return obj3;
	}

	toTitleCase(str)
	{
    	return str.replace(
    		/\w\S*/g, 
    		function(txt){
    			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    		}
    	);
	}

}