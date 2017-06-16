import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AppDbCommon } from '../common';

export class UserCredential {
    email_address: string = '';
    passwords: Password[] = [];
}

export class Password {
    password: string = '';
}

@Component({
	selector: 'app-db-user',
	templateUrl: './user.component.html', 
	styleUrls: ['./user.component.css']
})
export class DbUserComponent extends AppDbCommon implements OnInit {
    private formTitle = 'User Credentials';
    private formSummary = 'User credentials to login';
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

    save(model: UserCredential) {
        this.submitted = true;
        // call API to save
        // ...
        console.log(model);
    }
}