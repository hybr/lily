
import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, } from 'angularfire2';
import { ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { CollectionOfCollections } from './model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-collection-addincall',
  templateUrl: './updateInColl.component.html',
  styleUrls: [ './style.component.css' ]
})
export class UpdateDocInCollComponent implements OnInit {
  public recordStructure: Array<any> = <any>[];
  public recordValues: Array<any> = <any>[];

  public listOfCollToUpdate: FirebaseListObservable<any[]>;
  public docToUpdate: FirebaseObjectObservable<any>;
  public docOfCocs: FirebaseObjectObservable<CollectionOfCollections>;

  public submitted: boolean = false;

  constructor(
    private _af: AngularFire,
    private _route: ActivatedRoute,
    private _lss: LocalStorageService,
    private _location: Location
  ) {}

  removeSubFieldL1(i, fieldName) {
    if ( Object.prototype.toString.call( this.recordValues[fieldName] ) === '[object Array]') {
      this.recordValues[fieldName].splice(i, 1);  
    }
  }

  addSubFieldL1(fieldName, subFields) {
    if (
      this.recordValues[fieldName]['value'] == undefined
      || (!( Object.prototype.toString.call( this.recordValues[fieldName]['value'] ) === '[object Array]'))
    ) {
      this.recordValues[fieldName]['value'] = [];
    }
    (this.recordValues[fieldName]['value']).push(subFields);
  }
  
  createRecordStructureFromC3Table(cocsRecord) {
    console.log('cocsRecord received = ', cocsRecord);

    let localFields: Array<any> = <any>[];

    let sequence = 1;
    for (var property in cocsRecord ) {
      
      let fDefaultValue = '';
      if (cocsRecord[property]['default_value']) {
        fDefaultValue = cocsRecord[property]['default_value'];
      }

      let fType = 'string';
      if (cocsRecord[property]['type']) {
        fType = cocsRecord[property]['type'];
      }

      let fTitle = property.split('_').map(i => i[0].toUpperCase() + i.substr(1).toLowerCase()).join(' ');
      if (cocsRecord[property]['title']) {
        fTitle = cocsRecord[property]['title'];
      }

      let fSequence = sequence;
      sequence++;
      if (cocsRecord[property]['sequence']) {
        fSequence = cocsRecord[property]['sequence'];
      }

      let fSubFields = [];
      if (fType == 'fields') {
        fSubFields = this.createRecordStructureFromC3Table(
          cocsRecord[property]['fields']
        );

      }

      localFields.push({
        'name' : property,
        'title' : fTitle,
        'default_value': fDefaultValue,
        'type': fType,
        'fields': fSubFields,
        'sequence': fSequence
      });
    } /* for */

    localFields.sort(function(a, b) { 
        return a.sequence - b.sequence;
    });

    return localFields;
  } /* createRecordStructureFromC3Table */


  ngOnInit() {
    let self = this;
    let cDocKey = self._route.snapshot.paramMap.get('cDocKey');
    console.log('cDocKey =', cDocKey);

    let cNum = self._route.snapshot.paramMap.get('cNum');
    console.log('cNum  =', cNum);
    
    let docId = self._route.snapshot.paramMap.get('docId');
    console.log('docId  =', docId);
    
    self.listOfCollToUpdate = self._af.database.list(`/${cNum}`);
    console.log('self.listOfCollToUpdate = ', self.listOfCollToUpdate);

    self.docOfCocs = self._af.database.object(`/c3/${cDocKey}`);
    console.log('self.docOfCocs = ', self.docOfCocs);
    
    self.docToUpdate = self._af.database.object(`/${cNum}/${docId}`);
    console.log('docToUpdate = ', self.docToUpdate);

    self.docOfCocs.subscribe(
      function(cocsRecord) {
        // create class from json and assign to form
        self.recordStructure = self.createRecordStructureFromC3Table(cocsRecord['fields']);
        // TODO check if this is issue with formbuilder
        console.log('after createRecordStructureFromC3Table self.recordStructure = ', self.recordStructure);

        // get the values and assign to form
        self.docToUpdate.subscribe(
          function (docToUpdateRecord) {
            self.recordValues = docToUpdateRecord;
            console.log('self.recordValues = ', self.recordValues);
          } /* function (docToUpdateRecord) */
        ); /* docToUpdate.subscribe */

      } /* function(cocsRecord)  */
    ); /* self.docOfCocs.subscribe */
    
  } // ngOnInit

  onSubmit() {
    this.docToUpdate.update(this.recordValues);
    this._location.back();
  } // onSubmit
}
