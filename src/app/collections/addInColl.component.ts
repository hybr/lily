import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, } from 'angularfire2';
import { ActivatedRoute, Params } from '@angular/router';

import { CollectionOfCollections } from './model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection-addincall',
  templateUrl: './addInColl.component.html',
  styleUrls: [ './style.component.css' ]
})
export class AddDocInCollComponent implements OnInit {
  public docForm: FormGroup;
  public docOfCocs: FirebaseObjectObservable<CollectionOfCollections>;
  public submitted: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _af: AngularFire,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    let cDocKey = this._route.snapshot.paramMap.get('cDocKey');
    console.log('cDocKey =', cDocKey);
    let cNum = this._route.snapshot.paramMap.get('cNum');
    console.log('cNum  =', cNum);
    this.docOfCocs = this._af.database.object(`/c3/${cDocKey}`);
    console.log('this.docOfCocs = ', this.docOfCocs);
    this.docOfCocs.subscribe(
      function(result) {
        console.log('cDovKey result =', result);
        // create class from json and assign to form
        this.docForm = this._fb.group(result);
      }
    );
    
  } // ngOnInit
}
