import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { ActivatedRoute } from '@angular/router';
import { Collection } from './model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './detail.component.html',
  styleUrls: [ './style.component.css' ]
})
export class CollectionDetailComponent implements OnInit {

  collection: Observable<any>;
  
  actualCollectionList: Observable<any[]>;
  actualCollectionSearchPattern: string = '';
  
  constructor(
    private _af: AngularFire,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.collection = this._route.params
      .map(params => this._af.database.object(`/c3/${params['key']}` ))
    console.log('c1 = ', this.collection);
    this.searchActualCollections();
  }

  searchActualCollections(): void {
      console.log('c2 = ', this.collection.find()); 
    this.actualCollectionList = this._af.database.list('/c1' )
      .map(collections => collections.filter(actualCollection => {
        let rE = new RegExp(this.actualCollectionSearchPattern, 'gi');
        return rE.test(actualCollection.name) || rE.test(actualCollection.number) || rE.test(actualCollection.detail)
      }))
    ;
  }
}
