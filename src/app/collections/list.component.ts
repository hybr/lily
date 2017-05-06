
import { LocalStorageService } from 'angular-2-local-storage';
import * as appGlobal from '../app.globals';
import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/filter";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-collection-list',
  /* TODO: load themes dynamically */
  templateUrl: './list.component.html',
  styleUrls: [ './style.component.css' ],
})
export class ListDocsOfCocsComponent implements OnInit {

  public docOfCocs: FirebaseObjectObservable<any>;
  public listOfCocs: Observable<any[]>;
  searchPattern: string = '';

  constructor(
    private _af: AngularFire,
    private _lss: LocalStorageService
    ) {
    this.searchCollections();
    this.docOfCocs = this._af.database.object('/c1/-KjAxiZyYeXzupLkdeXl');
  }

  searchCollections(): void {
    this.listOfCocs = this._af.database.list('/c1')
    .map(collections => collections.filter(collection => {
      let rE = new RegExp(this.searchPattern, 'gi');
      return (rE.test(collection.a2) 
        || rE.test(collection.a3) 
        || rE.test(collection.a4))
    }));
  }

  ngOnInit() {
  }

}
