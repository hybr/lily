import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/filter";
import { Observable } from 'rxjs';
import { Collection } from './model';

@Component({
  selector: 'app-collection-list',
  templateUrl: './list.component.html',
  styleUrls: [ './style.component.css' ],
})
export class CollectionListComponent implements OnInit {

  collections: Observable<any>;
  searchPattern: string = '';
  
  constructor(private _af: AngularFire) {
    this.searchCollections();
  }

  searchCollections(): void {
    this.collections = this._af.database.list('/c3')
      .map(collections => collections.filter(collection => {
        let rE = new RegExp(this.searchPattern, 'gi');
        return rE.test(collection.name) || rE.test(collection.number) || rE.test(collection.detail)
      }));
  }
  
  ngOnInit() {
  }

}
