import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Collection } from './model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection-add',
  templateUrl: './add.component.html',
  styleUrls: [ './style.component.css' ]
})
export class CollectionAddComponent implements OnInit {
    collectionForm: FormGroup;
    collection = new Collection();
    submitted: boolean = false;
    constructor(
        private _fb: FormBuilder,
        private _af: AngularFire,
        private _router: Router
    ) {
        this.collectionForm = this._fb.group(this.collection);
    }
    
    onSubmit() {
        this._af.database.list('/c3').push(this.collectionForm.value);
        this.submitted = true;
        this._router.navigate(['/collections']);
    }
  ngOnInit() {}

}
