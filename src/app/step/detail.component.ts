import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { ActivatedRoute } from '@angular/router';
import { Step } from './model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-step-detail',
  templateUrl: './detail.component.html',
  styleUrls: [ './style.component.css' ]
})
export class StepDetailComponent implements OnInit {

  step: FirebaseObjectObservable<any>;

  constructor(
    private _af: AngularFire,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.params
      .map(params => params['key'])
      .subscribe(key => {
          this.step = this._af.database.object(`/c2/${key}`);
          console.log(this.step);
      })
    ;
  }

}
