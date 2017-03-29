import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Activity } from './model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-activity-add',
  templateUrl: './add.component.html',
  styleUrls: [ './style.component.css' ]
})
export class ActivityAddComponent implements OnInit {
    activityForm: FormGroup;
    activity = new Activity();
    submitted: boolean = false;
    constructor(
        private _fb: FormBuilder,
        private _af: AngularFire,
        private _router: Router
    ) {
        this.activityForm = this._fb.group(this.activity);
    }
    
    onSubmit() {
        this._af.database.list('/c1').push(this.activityForm.value);
        this.submitted = true;
        this._router.navigate(['/activity']);
    }
  ngOnInit() {}

}
