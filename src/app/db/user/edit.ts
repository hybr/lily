import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AppDbCommon } from '../common';
import { dbTableName, Record, Password, formTitle, formSummary } from './record';

@Component({
	selector: 'app-db-user',
	templateUrl: './edit.html'
})
export class DbUserComponent extends AppDbCommon implements OnInit {

    private submitted = false;

    public recordForm: FormGroup;

    constructor(private _fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.recordForm = this._fb.group({
            email_address: ['', [Validators.required, Validators.email]],
            passwords: this._fb.array([
                this.initPassword(),
            ])
        });
        //this.logIt([this.recordForm]);
    }

    initPassword() {
        return this._fb.group({
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    } 

    addPassword() {
        const control = <FormArray>this.recordForm.controls['passwords'];
        control.push(this.initPassword());
    }

    removePassword(i: number) {
        const control = <FormArray>this.recordForm.controls['passwords'];
        control.removeAt(i);
    }

    save(model: Record) {
        this.submitted = true;
        // call API to save
        // ...
        console.log(model);
    }
}