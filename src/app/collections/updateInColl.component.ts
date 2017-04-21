
import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, } from 'angularfire2';
import { ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { CollectionOfCollections } from './model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-collection-addincall',
  templateUrl: './updateInColl.component.html',
  styleUrls: [ './style.component.css' ]
})
export class UpdateDocInCollComponent implements OnInit {
  public fields: Array<any> = <any>[];

  public listOfCollToUpdate: FirebaseListObservable<any[]>;
  public docOfCocs: FirebaseObjectObservable<CollectionOfCollections>;

  public submitted: boolean = false;

  constructor(
    private _af: AngularFire,
    private _route: ActivatedRoute,
    private _lss: LocalStorageService
  ) {}

  removeSubFieldL1(i, fieldName) {
    (this.fields[fieldName]).removeAt(i);
  }

  addSubFieldL1(fieldName, subFields) {
    this.fields[fieldName]['value'] = subFields;
  }
  
  createFieldsFromTable(cocsRecord) {
    let self = this;
    console.log('cocsRecord received = ', cocsRecord);
    let formFieldsGroup = {};
    let localFields: Array<any> = <any>[];

    let sequence = 1;
    for (var property in cocsRecord ) {
      
      let fValue = '';
      if (cocsRecord[property]['default_value']) {
        fValue = cocsRecord[property]['default_value'];
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

      if (fType == 'fields') {

        let groupObject = self.createFieldsFromTable(
          cocsRecord[property]['fields']
        );

        localFields.push({
          'name' : property,
          'title' : fTitle,
          'subFields': groupObject.lf,
          'value': fValue,
          'type': fType,
          'sequence': fSequence
        });
      } else {
        localFields.push({
          'name' : property,
          'title' : fTitle,
          'value': fValue,
          'type': fType,
          'sequence': fSequence
        });
      }

    } /* for */

    localFields.sort(function(a, b) { 
        return a.sequence - b.sequence;
    });

    return {lf: localFields};
  } /* getFormControlGroup */

  private applyFormValues (fields, formValues) {
    console.log('-------------------------------------');
    console.log('applyFormValues fields = ', fields);
    console.log('applyFormValues formValues = ', formValues);

    for (var i in fields) {
      console.log('=====================================');
      console.log('Updating values for ', i, fields[i]);
      if (fields[i].hasOwnProperty('subFields')) {
          fields[i]['value'] = [];
          for (var j in formValues[fields[i]['name']]) {
            fields[i]['value'][j]  = this.applyFormValues (fields[i]['subFields'], formValues[fields[i]['name']][j]);
          }

      } else {
        fields[i]['value'] = formValues[fields[i]['name']];
        console.log('Assigned value = ', formValues[fields[i]['name']]);
      }
    }

    return fields;
  }

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
    
    let docToUpdate = self._af.database.object(`/${cNum}/${docId}`);
    console.log('docToUpdate = ', docToUpdate);

    self.docOfCocs.subscribe(
      function(cocsRecord) {
        // create class from json and assign to form
        let groupObject  = self.createFieldsFromTable(cocsRecord['fields']);
        self.fields = groupObject.lf; // TODO check if this is issue with formbuilder

        console.log('after createFieldsFromTable self.fields = ', self.fields);

        // get the values and assign to form
        docToUpdate.subscribe(
          function (docToUpdateRecord) {
            console.log('docToUpdateRecord = ', docToUpdateRecord);
            self.fields = self.applyFormValues(self.fields, docToUpdateRecord);
            console.log('docForm after applying values from db = ', self.fields);
          } /* function (docToUpdateRecord) */
        ); /* docToUpdate.subscribe */

      } /* function(cocsRecord)  */
    ); /* self.docOfCocs.subscribe */
    
  } // ngOnInit

  onSubmit(model) {
    // this.listOfCollToUpdate.push(model.value);
    console.log('model = ', model)
  } // onSubmit
}
