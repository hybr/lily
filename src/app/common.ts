

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
		return Object.keys(obj);
	} /* keysOfObject */

	isObjectEmpty(obj) {
		if (obj == undefined) return true;
		return Object.keys(obj).length === 0 && obj.constructor === Object;
	}

	lengthOfVariable(obj) {
		if (obj.constructor === Object) return Object.keys(obj).length;
		if (obj.constructor === Array) return obj.length;
		return 0;
	}
	isVariableObject(v) {
		return (v !== null && typeof v === 'object');
	} /* isVariableObject */


	doesKeyExists(key, obj) {
		if (obj.constructor === Object) return (key in obj);
		if (obj.constructor === Array) return (this.lengthOfVariable(obj) >= key);
		// if (obj.constructor === Object) return obj.hasOwnProperty(key);
		return false;
	}
	

	logIt(messages) {
		this.debug && console.log('===== LogIt', JSON.stringify(messages));
	} /* debug */
}