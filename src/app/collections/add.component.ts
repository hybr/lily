import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CollectionOfCollections } from './model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection-add',
  templateUrl: './add.component.html',
  styleUrls: [ './style.component.css' ]
})
export class AddDocInCocsComponent implements OnInit {
    public afv = ['val1'];
    public afp = [{title: 'Title 3'}];

    cocsForm: FormGroup;
    cocs = new CollectionOfCollections();
    submitted: boolean = false;
    constructor(
        private _fb: FormBuilder,
        private _af: AngularFire,
        private _router: Router
    ) {
        this.cocsForm = this._fb.group(this.cocs);
    }
    
    onSubmit() {
        this._af.database.list('/c3').push(this.cocsForm.value);
        this.submitted = true;
        this._router.navigate(['/cocs/list']);
    }
  ngOnInit() {}

}
