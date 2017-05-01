import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-collections-record-field',
	templateUrl: './record-field.component.html',
	styleUrls: ['./record-field.component.css']
})
export class RecordFieldComponent implements OnInit {

	@Input() fieldProperties: Object = {};
	@Input() fieldValue : string = '';
	@Output() fieldValueUpdated: EventEmitter<any> = new EventEmitter<any>();

	constructor() {}

	fieldValueChanged(value) {
		let obj = {};
		if (this.fieldProperties['name'] == undefined) {
			this.fieldProperties['name'] = 'unknown_field_property';
		}
		obj[this.fieldProperties['name']] = value;
		console.log('Field is emitting obj = ', obj);
		this.fieldValueUpdated.emit(obj);
	}

	ngOnInit() {
		/* default values of properties of field */


		console.log(
			'Name = ', this.fieldProperties['name'], 
			' Data = ', this.fieldValue, 
			' fieldProperties = ', this.fieldProperties
		);
		if (this.fieldValue == undefined) {
			if (this.fieldProperties['value'] != undefined) { 
				this.fieldValue = this.fieldProperties['value']; 
			} else {
				if (this.fieldProperties['default_value'] != undefined) { 
					this.fieldValue = this.fieldProperties['default_value']; 
				} else {
					this.fieldValue = '';
				}
			}
		}
		console.log(' Updated Data = ', this.fieldValue);
	} /* ngOnInit()  */


}
