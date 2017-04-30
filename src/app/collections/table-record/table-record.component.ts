import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, } from 'angularfire2';
import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'app-collections-table-record',
	templateUrl: './table-record.component.html',
	styleUrls: ['./table-record.component.css']
})
export class TableRecordComponent implements OnInit {
	
	public docOfCocs: FirebaseObjectObservable<any>;
	public recordStructure: Object = {};

	@Input() recordValues : Object  = {};
	@Input() tableNumber: string = 'c3';
	@Output() recordValuesUpdated: EventEmitter<any> = new EventEmitter<any>();

	updateFieldValue(fieldName, value) {
		this.recordValues[fieldName] = value[fieldName];
	}

	onsubmit() {
		this.recordValuesUpdated.emit(this.recordValues);
	}

	createRecordStructureFromC3Table(cocsRecord) {
		console.log('cocsRecord received = ', cocsRecord);

		let convertedRecordStructure: Object = {};

		let sequence = 1;


		for (var property in cocsRecord ) {

			if (property == 'sorted_field_names') { continue; }

			let field = cocsRecord[property];

			console.log('field of ', property, ' = ', field);

			let fFieldType = 'field';
			if (field['field_type']) {
				fFieldType = field['field_type'];
			}

			let fName = property;
			if (field['name']) {
				fName = field['name'];
			}

			let fDefaultValue = '';
			if (field['default_value']) {
				fDefaultValue = field['default_value'];
			}

			let fValue = fDefaultValue;
			if (field['v']) {
				fValue = field['v'];
			}

			let fValueType = 'string';
			if (field['value_type']) {
				fValueType = field['value_type'];
			}

			let fTitle = fName.split('_').map(i => i[0].toUpperCase() + i.substr(1).toLowerCase()).join(' ');
			if (field['title']) {
				fTitle = field['title'];
			}

			let fSequence = sequence;
			sequence++;
			if (field['sequence']) {
				fSequence = field['sequence'];
			}

			let fFieldGroup = sequence;
			sequence++;
			if (field['sequence']) {
				fSequence = field['sequence'];
			}

			var resultObj : Object  = {};
			if (fFieldType == 'field_group' && field['fields']) {
				resultObj = this.createRecordStructureFromC3Table(
					field
				);
			}

			convertedRecordStructure[fName] = {
				'field_type': fFieldType,
				'name' : fName,
				'title' : fTitle,
				'sequence': fSequence,
				'default_value': fDefaultValue,
				'value_type': fValueType,
				'fields' : resultObj
			};
		} /* for */

		let sortedKeys = Object.keys(convertedRecordStructure)
		convertedRecordStructure['sorted_field_names'] = sortedKeys;

		return convertedRecordStructure;
	} /* createRecordStructureFromC3Table */

	constructor(
		private _af: AngularFire
	) { }

	ngOnInit() {
		let self = this;

		/* Collection Structure of tableNumber */
		const subject = new Subject();

		const queryObservable = self._af.database.list('/c3', {
			query: {
			orderByChild: 'f2', /* collection number */
			equalTo: subject
			}
		});

		// subscribe to changes
		queryObservable.subscribe(record => {
		  console.log('Record for collection number ', this.tableNumber, ' is ', record);  
		});

		// trigger the query
		subject.next(self.tableNumber);


		this.recordStructure = 
		{ 
			'f1' : true,
			'f2' : 'c3',
			'f3' : 'Collections',

			'fields' : [
			{
				name: 'f1',
				value_type: 'boolean',
				field_type: 'field',
				title: 'Status',
				sequence: 1

			},
			{
				name: 'f2',
				value_type: 'string',
				field_type: 'field',
				title: 'Collection Number',
				sequence: 2

			},
			{
				name: 'f3',
				value_type: 'string',
				field_type: 'field',
				title: 'Collection Name',
				sequence: 3

			},
			{
				name: 'f4',
				value_type: 'string',
				field_type: 'field',
				title: 'Detail',
				sequence: 4

			},
			{
				field_type: 'field_group',
				name: 'f5',
				title: 'Record Fields',
				multiple: true,
				field_group: true,
				sequence: 5,
				fields: [
					{
						name : 'name',
						title: 'Field Name',
						value_type: 'string',
						field_type: 'field',
						sequence: 2
					},
					{
						name : 'title',
						title: 'Field Title',
						value_type: 'string',
						field_type: 'field',
						sequence: 3
					},
					{
						name : 'sequence',
						title: 'Field Sequence',
						value_type: 'n umber',
						field_type: 'field',
						sequence: 1
					},
				]
			}
			],
			'title' : 'Collection Defination' 
		};

		this.recordStructure['fields'] = this.createRecordStructureFromC3Table(this.recordStructure['fields']);

		console.log('Final Record Structure = ', this.recordStructure);

		this.recordValues =  {
			
				"f1": true,

				"f2": "c10", 

				"f3": "Users",

				"f4": "The list of all users",

				"f5": {
					0: {"name": "f1",	"title": "Email Address"},
					1: {"name": "f2", 	"title": "Password"	}
				}
			
		};

		console.log('Final Record Values = ', this.recordValues);

	}

}
