import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/filter";
import { Observable } from 'rxjs';
import { Activity } from './model';

@Component({
  selector: 'app-activity-list',
  templateUrl: './list.component.html',
  styleUrls: [ './style.component.css' ],
})
export class ActivityListComponent implements OnInit {

  activities: Observable<any>;
  searchPattern: string = '';
  
  constructor(private _af: AngularFire) {
    this.searchActivities();
  }

  searchActivities(): void {
    this.activities = this._af.database.list('/c10')
      .map(activities => activities.filter(activity => {
        let rE = new RegExp(this.searchPattern, 'gi');
        return rE.test(activity.a3) || rE.test(activity.a2) || rE.test(activity.a4)
      }));
  }
  
  ngOnInit() {
  }

}
