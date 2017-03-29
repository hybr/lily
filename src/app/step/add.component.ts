import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Step } from './model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-add',
  templateUrl: './add.component.html',
  styleUrls: [ './style.component.css' ]
})
export class StepAddComponent implements OnInit {
    stepForm: FormGroup;
    step = new Step();
    submitted: boolean = false;
    constructor(
        private _fb: FormBuilder,
        private _af: AngularFire,
        private _router: Router
    ) {
        this.stepForm = this._fb.group(this.step);
    }
    
    onSubmit() {
        this._af.database.list('/c2').push(this.stepForm.value);
        this.submitted = true;
        this._router.navigate(['/step']);
    }
  ngOnInit() {}

}
