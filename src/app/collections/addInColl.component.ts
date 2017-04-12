
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators  } from '@angular/forms';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, } from 'angularfire2';
import { ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { CollectionOfCollections } from './model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-collection-addincall',
  templateUrl: './addInColl.component.html',
  styleUrls: [ './style.component.css' ]
})
export class AddDocInCollComponent implements OnInit {
  public fields = [];
  public docForm: FormGroup;
  public docOfCocs: FirebaseObjectObservable<CollectionOfCollections>;
  public submitted: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _af: AngularFire,
    private _route: ActivatedRoute,
    private _lss: LocalStorageService
  ) {}

  getFormControlGroup(cocsRecord) {
    let self = this;
    console.log('cocsRecord received = ', cocsRecord);
        let formFieldsGroup = {};
        for (var property in cocsRecord['fields']) {
          
          let fValue = '';
          if (cocsRecord['fields'][property]['default_value']) {
            fValue = cocsRecord['fields'][property]['default_value'];
          }

          let fType = 'string';
          if (cocsRecord['fields'][property]['type']) {
            fType = cocsRecord['fields'][property]['type'];
          }

          let fTitle = property.split(' ').map(i => i[0].toUpperCase() + i.substr(1).toLowerCase()).join(' ');
          if (cocsRecord['fields'][property]['title']) {
            fTitle = cocsRecord['fields'][property]['title'];
          }

          self.fields.push({
            'name' : property,
            'title' : fTitle,
            'value': fValue,
            'type': fType
          });

          if (fType == 'fields') {
            formFieldsGroup[property] = self._fb.array([
              self.getFormControlGroup(
                cocsRecord['fields'][property]['fields']
              ) 
            ]);
            console.log('sub field group = ', fType, cocsRecord['fields'][property]['fields'],
              self.getFormControlGroup({
                'fields' : cocsRecord['fields'][property]['fields']
              })
            );
            // formFieldsGroup[property] = new FormControl(fValue, []);
          } else {
            formFieldsGroup[property] = new FormControl(fValue, []);
          }

          
          console.log('cocsRecord property =', property, ' : ', formFieldsGroup[property]);
        } /* for */
        console.log('formFieldsGroup = ', formFieldsGroup);
        return formFieldsGroup;
  } /* getFormControlGroup */

  ngOnInit() {
    let self = this;
    let cDocKey = self._route.snapshot.paramMap.get('cDocKey');
    console.log('cDocKey =', cDocKey);
    let cNum = self._route.snapshot.paramMap.get('cNum');
    console.log('cNum  =', cNum);
    self.docOfCocs = self._af.database.object(`/c3/${cDocKey}`);
    console.log('self.docOfCocs = ', self.docOfCocs);
    self.docOfCocs.subscribe(
      function(cocsRecord) {
        // create class from json and assign to form
        self.docForm = self._fb.group(self.getFormControlGroup(cocsRecord));
      }
    );
    
  } // ngOnInit
}
