import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { ActivatedRoute } from '@angular/router';
import { Form } from './form';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-detail',
  templateUrl: './add.component.html',
  styleUrls: [ './form.component.css' ]
})
export class FormAddComponent implements OnInit {

  form: FirebaseObjectObservable<any>;
  newForm = new Form();
  
  constructor(
    private _af: AngularFire,
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit() {}

}
