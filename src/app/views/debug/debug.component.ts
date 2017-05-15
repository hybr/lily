import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-debug',
	templateUrl: './debug.component.html',
	styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {
	public debugCode: boolean = true;
	public messages: any[] = [];

	constructor() { }

	ngOnInit() {
	}

	show(msgs: any[]) {
		if (this.debugCode) {
			this.messages = msgs;
			console.log('-----------------------------------------------------');
			msgs.forEach(function(msg) {
				console.log(msg);
			});
		}
	} /* show */
}
