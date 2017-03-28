import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { ActivatedRoute } from '@angular/router';
import { Activity } from './model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './detail.component.html',
  styleUrls: [ './activity.component.css' ]
})
export class ActivityDetailComponent implements OnInit {

  activity: FirebaseObjectObservable<any>;

  constructor(
    private _af: AngularFire,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.params
      .map(params => params['key'])
      .subscribe(key => {
          this.activity = this._af.database.object(`/c1/${key}`);
          console.log(this.activity);
      })
    ;
  }

}
