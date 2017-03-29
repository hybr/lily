import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/filter";
import { Observable } from 'rxjs';
import { Step } from './model';

@Component({
  selector: 'app-step-list',
  templateUrl: './list.component.html',
  styleUrls: [ './style.component.css' ],
})
export class StepListComponent implements OnInit {

  steps: Observable<any>;
  searchPattern: string = '';
  
  constructor(private _af: AngularFire) {
    this.searchSteps();
  }

  searchSteps(): void {
    this.steps = this._af.database.list('/c2')
      .map(steps => steps.filter(step => {
        let rE = new RegExp(this.searchPattern, 'gi');
        return rE.test(step.name) || rE.test(step.number) || rE.test(step.detail)
      }));
  }
  
  ngOnInit() {
  }

}
