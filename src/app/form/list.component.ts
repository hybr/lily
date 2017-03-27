import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import "rxjs/add/operator/filter";
import { Observable } from 'rxjs';
import { Form } from './form';

@Component({
  selector: 'app-form-list',
  templateUrl: './list.component.html',
  styleUrls: [ './form.component.css' ],
  providers: [ ]
})
export class FormListComponent implements OnInit {

  forms: Observable<any>;

  constructor(private _af: AngularFire) {
    this.forms = _af.database.list('/c1')
       .map(forms => forms.filter(form => form.name === 'Register User'));
  }

 
  ngOnInit() {
  }

}
