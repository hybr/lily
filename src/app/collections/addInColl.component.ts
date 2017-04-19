
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
  public fields: Array<any> = <any>[];
  public docForm: FormGroup;
  public listOfColl: FirebaseListObservable<any[]>;
  public docOfCocs: FirebaseObjectObservable<CollectionOfCollections>;
  public submitted: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _af: AngularFire,
    private _route: ActivatedRoute,
    private _lss: LocalStorageService
  ) {}

  removeSubFieldL1(i, fieldName) {
    (<FormArray>this.docForm.controls[fieldName]).removeAt(i);
  }

  addSubFieldL1(fieldName, fieldGroup) {
    const control = <FormArray>this.docForm.controls[fieldName];
    control.push(this._fb.group(this.docForm['controls'][fieldName]['controls'][0]['controls']));
  }
  
  getFormControlGroup(cocsRecord) {
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

        let { fbg, lf} = self.getFormControlGroup(
          cocsRecord[property]['fields']
        );

        formFieldsGroup[property] = self._fb.array([
           fbg
        ]);
        localFields.push({
          'name' : property,
          'title' : fTitle,
          'value': lf,
          'type': fType,
          'sequence': fSequence
        });
        // formFieldsGroup[property] = new FormControl(fValue, []);
      } else {
        localFields.push({
          'name' : property,
          'title' : fTitle,
          'value': fValue,
          'type': fType,
          'sequence': fSequence
        });
        formFieldsGroup[property] = new FormControl(fValue, []);
      }

    } /* for */

    localFields.sort(function(a, b) { 
        return a.sequence - b.sequence;
    });

    return {fbg: self._fb.group(formFieldsGroup), lf: localFields};
  } /* getFormControlGroup */

  ngOnInit() {
    let self = this;
    let cDocKey = self._route.snapshot.paramMap.get('cDocKey');
    console.log('cDocKey =', cDocKey);
    let cNum = self._route.snapshot.paramMap.get('cNum');
    console.log('cNum  =', cNum);
    self.listOfColl = self._af.database.list(`/${cNum}`);
    self.docOfCocs = self._af.database.object(`/c3/${cDocKey}`);
    console.log('self.docOfCocs = ', self.docOfCocs);
    self.docOfCocs.subscribe(
      function(cocsRecord) {
        // create class from json and assign to form
        let { fbg, lf} = self.getFormControlGroup(cocsRecord['fields']);
        self.docForm = fbg;
        console.log('docForm = ', self.docForm);
        self.fields.push(lf);
      }
    );
    
  } // ngOnInit

  onSubmit(model: FormGroup) {
    this.listOfColl.push(model.value);
    alert('Saved');
    console.log('model = ', model)
  } // onSubmit
}
