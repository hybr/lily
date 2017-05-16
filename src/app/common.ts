

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

	isVariableObject(v) {
		return (v !== null && typeof v === 'object');
	} /* isVariableObject */

	logIt(messages) {
		this.debug && console.log(messages);
	} /* debug */
}