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
		//console.log('Received in table record = fieldName ', fieldName, ' value ', value);
		this.recordValues[fieldName] = value[fieldName];
	}

	onsubmit() {
		this.recordValuesUpdated.emit(this.recordValues);
	}

	createRecordStructureFromC3Table(cocsRecord) {
		//console.log('########################################');
		//console.log('cocsRecord received = ', cocsRecord);

		let convertedRecordStructure: Object = {};

		let sequenceCounter = 1;

		/* 
			f1 = name 
			f2 = title
			f3 = field_type
			f4 = sequence
			f5 = value_type
		*/

		for (var key of Object.keys(cocsRecord) ) {

			if (key == 'sorted_field_names') { continue; }
			if (cocsRecord[key]['f1'] == 'sorted_field_names') { continue; }
			if (cocsRecord[key]['f1'] == undefined) { continue; }


			let property = cocsRecord[key]['f1'];

			let field = cocsRecord[key];

			//console.log('field of ', property, ' = ', field);

			let fFieldType = 'field';
			if (field['f3']) {
				fFieldType = field['f3'];
			}

			let fName = property;
			if (field['f1']) {
				fName = field['f1'];
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
			if (field['f5']) {
				fValueType = field['f5'];
			}

			let fTitle = fName.split('_').map(i => i[0].toUpperCase() + i.substr(1).toLowerCase()).join(' ');
			if (field['f2']) {
				fTitle = field['f2'];
			}

			let fSequence = sequenceCounter;
			sequenceCounter++;
			if (field['f4']) {
				fSequence = parseInt(field['f4']);
			}

			convertedRecordStructure[fName] = {
				'f1' : fName,
				'f2' : fTitle,
				'f3' : fFieldType,
				'f4' : fSequence,
				'f5' : fValueType
			};

			var resultObj : Object  = {};
			if (fFieldType == 'field_group') {
				resultObj = this.createRecordStructureFromC3Table(
					field
				);
				convertedRecordStructure[fName]['fields'] = resultObj;
			}

			//console.log('==============================');

		} /* for */

		let localFields = [];
		/* create array of field objects */
		for (var k2 of Object.keys(convertedRecordStructure)) {
			localFields.push(convertedRecordStructure[k2]);
		}
		/* sort based on sequence field f4 */
		localFields.sort(function(a, b) { 
			if (a.f4 < b.f4) return -1;
			if (a.f4 > b.f4) return 1;
			return 0;
		});
    	//console.log('sorted localFields ', localFields, ' of convertedRecordStructure ', convertedRecordStructure);

		/* store sorted field names */
		convertedRecordStructure['sorted_field_names'] = [];
		localFields.forEach(function(fieldObject) {
			//console.log('Push ', fieldObject['f1'], ' in sorted_field_names in ', convertedRecordStructure['sorted_field_names']);
			convertedRecordStructure['sorted_field_names'].push(fieldObject['f1']);
		});
		/* free up memory */
		// delete localFields; TODO can not delete with defined as var/let
		//console.log('---------------------------');
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
		  //console.log('Record for collection number ', this.tableNumber, ' is ', record);  
		});

		// trigger the query
		subject.next(self.tableNumber);


		
		this.recordValues =  
{
	"a1": true,
	"a2": "c1",
	"a3": "Collections",
	"a4": "The list of collections",
	"a5": {
		"0": {
			"f1": "a1",
			"f2": "Is Collection Active",
			"f3": "field",
			"f5": "boolean",
			"f4": "1"
		},
		"1": {
			"f1": "a2",
			"f2": "Collection Number",
			"f3": "field",
			"f5": "string",
			"f4": "3"
		},
		"2": {
			"f1": "a3",
			"f2": "Collection Name",
			"f3": "field",
			"f5": "string",
			"f4": "2"
		},
		"3": {
			"f1": "a4",
			"f2": "Detail",
			"f3": "field",
			"f5": "string",
			"f4": "4"
		},
		"4": {
			"0": {
				"f1": "f1",
				"f2": "Name",
				"f3": "field",
				"f4": 1
			},
			"1": {
				"f1": "f2",
				"f2": "Title",
				"f3": "field",
				"f4": 2
			},
			"2": {
				"f1": "f3",
				"f2": "Field Type",
				"f3": "field",
				"f4": 3
			},
			"3": {
				"f1": "f4",
				"f2": "Sequence",
				"f3": "field",
				"f4": 5
			},
			"4": {
				"f1": "f5",
				"f2": "Value Type",
				"f3": "field",
				"f4": 4
			},
			"5": {
				"f1": "f6",
				"f2": "Default Value",
				"f3": "field",
				"f4": 6
			},
			"6": {
				"f1": "f7",
				"f2": "Is Required",
				"f3": "field",
				"f4": 7,
				"f5" : 'boolean'
			},
			"f1": "a5",
			"f2": "Record Structure",
			"f3": "field_group",
			"f5": "object",
			"f4": "5"
		}
	}
}

		this.recordStructure = this.createRecordStructureFromC3Table(this.recordValues['a5']);
		//console.log('Final Record Structure = ', this.recordStructure);
		//console.log('Final Record Values = ', this.recordValues);
	}

}
