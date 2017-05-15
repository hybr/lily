import { Component, OnInit, Input } from '@angular/core';
import { AppDbCommon } from '../common';

@Component({
	selector: 'app-db-group-field',
	templateUrl: './group-field.component.html',
	styleUrls: ['./group-field.component.css']
})
export class GroupFieldComponent extends AppDbCommon implements OnInit {

	@Input() fieldGroup: Object;

	constructor() { 
		super();
	}

	ngOnInit() {
	}

}
