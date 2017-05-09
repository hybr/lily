import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable , FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './detail.component.html',
  styleUrls: [ './style.component.css' ]
})
export class DetailDocOfCocsComponent implements OnInit {

  public docOfCocs: FirebaseObjectObservable<any>;
  public actualCollectionList: Observable<any[]>;
  public actualCollectionSearchPattern: string = '';
  public actualCollectionNumber = '';
  
  constructor(
    private _afdb: AngularFireDatabase,
    private _route: ActivatedRoute
    ) {
  } // constructor

  ngOnInit() {
    let key = this._route.snapshot.paramMap.get('key');
    this.docOfCocs = this._afdb.object(`/c1/${key}`);
    this.searchActualCollections();  
  } // ngOnInit

  searchActualCollections(): void {
    let self = this;
    // console.log('detail.component: docOfCocs = ', self.docOfCocs);
    this.docOfCocs.subscribe(
      function(result) {
        // console.log('detail.component: result =', result);
        self.actualCollectionList = self._afdb.list('/' + result['a2'])
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
