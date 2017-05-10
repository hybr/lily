import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
	selector: 'app-collections-record-field',
	templateUrl: './record-field.component.html',
	styleUrls: ['./record-field.component.css']
})
export class RecordFieldComponent implements OnInit {

	@Input() fieldProperties: Object = {};
	@Input() fieldValue : string = '';
	@Output() fieldValueUpdated: EventEmitter<any> = new EventEmitter<any>();

	public foreignKeyList: any[] = [];
	@Input() foreignKeyCollectionName : string = '';
	@Input() foreignKeyTitleFields : string = '';

	constructor(
		private _af: AngularFireDatabase
	) {}

	fieldValueChanged(value) {
		let obj = {};
		if (this.fieldProperties['f1'] == undefined) {
			this.fieldProperties['f1'] = 'unknown_field_property';
		}
		obj[this.fieldProperties['f1']] = value;
		console.log('RecordFieldComponent: Field is emitting obj = ', obj);
		this.fieldValueUpdated.emit(obj);
	}

	getforeignKeyListTitle(v) {
		var a = this.foreignKeyList.filter(
			function( obj ) {  
				return (obj.value == v) 
			}
		);
		var o = a? a[0] : null;
		return o? o['title'] : null;
	}
	

	ngOnInit() {
		let self = this;

		if (this.fieldProperties['f5'] == 'foreign_key') {		
			self._af.list('/' + self.foreignKeyCollectionName).subscribe(record => {
				for (var r of record ) {
					let t = '';
					for (var tf of self.foreignKeyTitleFields.split(',')) {
						t = r[tf]? t + ' ' + r[tf] : t + ' unknown field name ' + tf; 
					}
					self.foreignKeyList.push({value: r.$key, title: t});
				} /* for */
			});
		} /* this.fieldProperties['f5'] == 'foreign_key' */


		/*console.log(
			'Name = ', this.fieldProperties['f1'], 
			' Data = ', this.fieldValue, 
			' fieldProperties = ', this.fieldProperties
		);*/
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
		//console.log(' Updated Data = ', this.fieldValue);
	} /* ngOnInit()  */


}
