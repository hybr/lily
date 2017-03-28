import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Activity } from './model';

@Component({
  selector: 'app-activity-add',
  templateUrl: './add.component.html',
  styleUrls: [ './activity.component.css' ]
})
export class ActivityAddComponent implements OnInit {
    activityForm: FormGroup;
    activity = new Activity();
    submitted: boolean = false;
    constructor(
        private fb: FormBuilder,
        private _af: AngularFire
    ) {
        this.activityForm = this.fb.group(this.activity);
    }
    
    onSubmit() {
        this._af.database.list('/c1').push(this.activityForm.value);
        this.submitted = true;
    }
  ngOnInit() {}

}
