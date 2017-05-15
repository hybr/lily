import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-db-field',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
	@Input() fieldProperties: Object = {};
	@Input() fieldValue : string = '';

	constructor() { }

	ngOnInit() {
	}

}
