import { Injectable } from '@angular/core';

import { Form } from './form';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FormDataService {

  /* forms: Form[] = []; */
  forms: FirebaseListObservable<any[]>;
  
  constructor(private af: AngularFire) {
    af.database.list('/c1').subscribe(forms => console.log(forms));
  }

 

}

