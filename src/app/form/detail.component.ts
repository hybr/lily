import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { ActivatedRoute } from '@angular/router';
import { Form } from './form';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-detail',
  templateUrl: './detail.component.html',
  styleUrls: [ './form.component.css' ]
})
export class FormDetailComponent implements OnInit {

  form: Observable<any>;

  constructor(
    private _af: AngularFire,
    private _route: ActivatedRoute
  ) {
  }

   ngOnInit() {
     this._route.params
       .map(params => params['key'])
       .subscribe(key => {
           this.form = this._af.database.object(`/c1/${key}`)
       });
  }

}
