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

  collection: FirebaseObjectObservable<any>;
  
  actualCollectionList: Observable<any[]>;
  actualCollectionSearchPattern: string = '';
  
  constructor(
    private _af: AngularFire,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.params
      .map(params => params['key'])
      .subscribe(key => {
          this.collection = this._af.database.object(`/c3/${key}`);
          console.log(this.collection);
      })
    ;
    this.searchActualCollections();
  }

  searchActualCollections(): void {
    this.actualCollectionList = this._af.database.list('/' + this.collection.number)
      .map(collections => collections.filter(actualCollection => {
        let rE = new RegExp(this.actualCollectionSearchPattern, 'gi');
        return rE.test(actualCollection.name) || rE.test(actualCollection.number) || rE.test(actualCollection.detail)
      }))
    ;
  }
}
