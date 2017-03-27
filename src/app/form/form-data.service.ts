import { Injectable } from '@angular/core';

import { Form } from './form';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FormDataService {

  /* forms: Form[] = []; */
  forms: FirebaseListObservable<any[]>;
  numberSubject: Subject<any>;
  
  count: number = 0;
  
  constructor(private af: AngularFire) {
    this.numberSubject = new Subject();
    this.forms = af.database.list('/c1', {
      query: {
        orderByChild: 'number',
        equalTo: this.numberSubject
      }
    });
  }

  // Simulate POST /forms
  add(form: Form): FormDataService {
    if (!form.number) {
      this.count++;
      form.number = <string><any>(this.count);
    }
    this.forms.push(form);
    return this;
  }

  remove(form) {
    this.forms.remove(form);
  }
  
  // Simulate DELETE /forms/:number
  /*
  deleteByNumber(number: string): FormDataService {
    return this.forms.filter(form => form.number !== number);
  }
  */
  // Simulate PUT /forms/:number
  updateByNumber(number: string, values: Object = {}): Form {
    let form = this.getByNumber(number);
    if (!form) {
      return null;
    }
    Object.assign(form, values);
    return form;
  }

  // Simulate GET /forms
  getAll(): FirebaseListObservable<any[]> {
    return this.af.database.list('/c1');
  }

  filterBy(number: string) {
    this.numberSubject.next(number);
  }
  
  // Simulate GET /forms/:number
  getByNumber(number: string) {
     
     return this.forms.child('users').orderByChild('number').equalTo(number);
    /* const queryObservable = this.af.database.list('/c1', {
      query: {
        orderByChild: 'number',
        equalTo: number
      }
    });
    return queryObservable;
    */
  }

  // Toggle form complete
  toggleObsolete(form: Form){
    let updated = this.updateByNumber(form.number, {
      obsolete: !form.obsolete
    });
    return updated;
  }

}

