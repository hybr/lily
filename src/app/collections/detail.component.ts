import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { ActivatedRoute, Params } from '@angular/router';
import { CollectionOfCollections } from './model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './detail.component.html',
  styleUrls: [ './style.component.css' ]
})
export class DetailDocOfCocsComponent implements OnInit {

  public docOfCocs: FirebaseObjectObservable<CollectionOfCollections>;
  public actualCollectionList: Observable<CollectionOfCollections[]>;
  public actualCollectionSearchPattern: string = '';
  public actualCollectionNumber = '';
  
  constructor(
    private _af: AngularFire,
    private _route: ActivatedRoute
    ) {
  } // constructor

  ngOnInit() {
    let key = this._route.snapshot.paramMap.get('key');
    this.docOfCocs = this._af.database.object(`/c1/${key}`);
    this.searchActualCollections();  
  } // ngOnInit

  searchActualCollections(): void {
    let self = this;
    console.log('cD = ', self.docOfCocs);
    this.docOfCocs.subscribe(
      function(result) {
        console.log('result =', result);
        self.actualCollectionList = self._af.database.list('/' + result['a2'])
        .map(collections => collections.filter(
          actualCollection => {
            let rE = new RegExp(self.actualCollectionSearchPattern, 'gi');
            return (rE.test(actualCollection.a2) 
              || rE.test(actualCollection.a3) 
              || rE.test(actualCollection.a4));
          }
          ));
        
      }
    );
  } // searchActualCollections

}  // class DetailDocOfCocsComponent
