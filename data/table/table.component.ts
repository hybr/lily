import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Table } from './table.model';

@Component({
	selector: 'app-data-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

	public myForm: FormGroup; // our form model

	// we will use form builder to simplify our syntax
	constructor(private _fb: FormBuilder) { }

	ngOnInit() {
		this.myForm = this._fb.group({
			name: ['', [Validators.required, Validators.minLength(5)]],
			fields: this._fb.array([
				this.initField(),
				])
		});
	}

	initField() {
		return this._fb.group({
			name: ['', Validators.required],
			value_type: ['']
		});
	}

	addField() {
		const control = <FormArray>this.myForm.controls['fields'];
		control.push(this.initField());
	}

	removeField(i: number) {
		const control = <FormArray>this.myForm.controls['fields'];
		control.removeAt(i);
	}


	save(model: Table) {
		console.log(model);
	}

}
