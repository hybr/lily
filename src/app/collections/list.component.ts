import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/filter";
import { Observable } from 'rxjs';
import { CollectionOfCollections } from './model';

@Component({
  selector: 'app-collection-list',
  templateUrl: './list.component.html',
  styleUrls: [ './style.component.css' ],
})
export class ListDocsOfCocsComponent implements OnInit {

  public docOfCocs: FirebaseObjectObservable<CollectionOfCollections>;
  public listOfCocs: Observable<CollectionOfCollections[]>;
  searchPattern: string = '';
  
  constructor(private _af: AngularFire) {
    this.searchCollections();
    this.docOfCocs = this._af.database.object('/c3/-KgRw3KNYJBPnOGnPw9H');
  }

  searchCollections(): void {
    this.listOfCocs = this._af.database.list('/c3')
      .map(collections => collections.filter(collection => {
        let rE = new RegExp(this.searchPattern, 'gi');
        return (rE.test(collection.name) 
            || rE.test(collection.number) 
            || rE.test(collection.detail))
      }));
  }
  
  ngOnInit() {
  }

}
