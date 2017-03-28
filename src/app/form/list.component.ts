import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/filter";
import { Observable } from 'rxjs';
import { Form } from './form';

@Component({
  selector: 'app-form-list',
  templateUrl: './list.component.html',
  styleUrls: [ './form.component.css' ],
})
export class FormListComponent implements OnInit {

  forms: Observable<any>;
  searchPattern: string = '';
  
  constructor(private _af: AngularFire) {
    this.searchForms();
  }

  searchForms(): void {
    this.forms = this._af.database.list('/c1')
      .map(forms => forms.filter(form => {
        let rE = new RegExp(this.searchPattern, 'gi');
        return rE.test(form.name) || rE.test(form.form_number) || rE.test(form.detail)
      }));
  }
  
  ngOnInit() {
  }

}
