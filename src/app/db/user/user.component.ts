import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

export interface UserCredential {
    email_address: string;
    passwords: Password[];
}

export interface Password {
    street: string;
    postcode: string;
}

@Component({
	selector: 'app-db-user',
	templateUrl: './user.component.html', 
	styleUrls: ['./user.component.css']
})
export class DbUserComponent implements OnInit {
    public recordForm: FormGroup;

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        this.recordForm = this._fb.group({
            email_address: ['', [Validators.required, Validators.minLength(5)]],
            passwords: this._fb.array([
                this.initPassword(),
            ])
        });
    }

    initPassword() {
        return this._fb.group({
            street: ['', Validators.required],
            postcode: ['']
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

    save(model: UserCredential) {
        // call API to save
        // ...
        console.log(model);
    }
}