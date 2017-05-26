import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Field } from './field.model';


@Component({
  selector: 'app-data-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

	public myForm: FormGroup; // our form model

	// we will use form builder to simplify our syntax
	constructor(private _fb: FormBuilder) { }

	ngOnInit() {
		this.myForm = this._fb.group({
			name: ['', [Validators.required, Validators.minLength(5)]],
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

}
