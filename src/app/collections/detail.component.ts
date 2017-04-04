import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { ActivatedRoute, Params } from '@angular/router';
import { Collection } from './model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './detail.component.html',
  styleUrls: [ './style.component.css' ]
})
export class CollectionDetailComponent implements OnInit {

  public collectionDocument: FirebaseObjectObservable<any>;
  public actualCollectionList: Observable<any[]>;
  public actualCollectionSearchPattern: string = '';
  public actualCollectionNumber = '';
  
  constructor(
    private _af: AngularFire,
    private _route: ActivatedRoute
  ) {
  } // constructor

  ngOnInit() {
    let key = this._route.snapshot.paramMap.get('key');
    this.collectionDocument = this._af.database.object(`/c3/${key}`);
    this.searchActualCollections();  
  } // ngOnInit

  searchActualCollections(): void {
    let self = this;
    console.log('cD = ', self.collectionDocument);
    this.collectionDocument.subscribe(
        function(result) {
          console.log('result =', result);
          self.actualCollectionList = self._af.database.list('/' + result['number'])
          .map(collections => collections.filter(
            actualCollection => {
              let rE = new RegExp(self.actualCollectionSearchPattern, 'gi');
              return (rE.test(actualCollection.name) 
                || rE.test(actualCollection.number) 
                || rE.test(actualCollection.detail));
            }
          ));
        
        }
    );
  } // searchActualCollections

}  // class CollectionDetailComponent