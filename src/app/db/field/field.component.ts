import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppDbCommon } from '../common';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
	selector: 'app-db-field',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.css']
})
export class FieldComponent extends AppDbCommon implements OnInit {
	public foreignKeyList: any[] = [];
	/* TODO: Change most of the public to private */
	private lists: Object = {};

	@Input() fieldParentName: string = '';
	@Input() fieldProperties: Object = {};
	@Input() fieldValue: Object = {};
	@Input() foreignKeyCollectionName : string = '';
	@Input() foreignKeyTitleFields : string = '';

	@Output() fieldIsUpdated: EventEmitter<any> = new EventEmitter<any>();
	@Output() fieldPropertiesIsUpdated: EventEmitter<any> = new EventEmitter<any>();

	changedNgModel(value) {
		if (value == undefined) {
			if (this.fieldProperties['_d'] != undefined) {
				value = this.fieldProperties['_d'];
			} else {
				if (this.fieldProperties['_y'].toLowerCase() == 'boolean') {
					value = true;
				} else if (this.fieldProperties['_y'].toLowerCase() == 'number') {
					value = 0;
				} else if (this.fieldProperties['_y'].toLowerCase() == 'field_type') {
					value = true;
				} else if (this.fieldProperties['_y'].toLowerCase() == 'field_sequence') {
					value= 1;
				} else {
					value = '';	
				}
			}
		}
		this.fieldValue = value;

		this.announceIt(
			value,
			this.fieldIsUpdated,
			'FieldComponent: changedNgModel'
		);
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

	updateFieldProperties(updatedProperties) {
		this.fieldProperties = updatedProperties;
		if (this.fieldProperties['_m'] > 0) {
			// if field allow multiple values make it field group
			this.fieldProperties['_f'] = false;
			this.logIt(['FieldComponent: updateFieldProperties: Making field as field group as multiple become more than 0']);
		}
		if (this.fieldProperties['_f'] == false && this.fieldProperties['_m'] < 1) {
			// if a filed is of type field group then allow multiple values inside
			this.fieldProperties['_m'] = 1;
			this.logIt(['FieldComponent: updateFieldProperties: Allowing multiple values as field type changed to group']);
		}
		if (this.fieldProperties['_m'] > 0 && (!this.isVariableObject(this.fieldValue))) {
			// field value should change to object for field_group or multiple values
			this.fieldValue = {};
			this.announceIt(
				this.fieldValue,
				this.fieldIsUpdated,
				'FieldComponent: changedNgModel'
			);
		}

		this.announceIt(
			this.fieldProperties,
			this.fieldPropertiesIsUpdated,
			'FieldComponent: updateFieldProperties'
		);
	}
	
	constructor(
		private _afd: AngularFireDatabase
	) { 
		super();
	}

	ngOnInit() {
		let self = this;
		if (self.fieldProperties['_y'] == 'foreign_key') {		
			self._afd.list('/' + self.foreignKeyCollectionName).subscribe(record => {
				for (var r of record ) {
					let t = '';
					for (var tf of self.foreignKeyTitleFields.split(',')) {
						t = r[tf]? t + ' - ' + r[tf] : t + ' unknown field name ' + tf; 
					}
					self.foreignKeyList.push({value: r.$key, title: t});
				} /* for */
				self.logIt(['FieldComponent: ngOnInit: self.foreignKeyList', self.foreignKeyList]);
			});
		} /* self.fieldProperties['f5'] == 'foreign_key' */	
		this.lists = {
			'gender' : {
				'male': 'Male',
				'female': 'Female',
				'other': 'Other'
			}
		};
	}

}
