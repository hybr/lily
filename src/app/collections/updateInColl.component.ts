
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators  } from '@angular/forms';
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

  private applyFormValues (group, formValues, isFromArray) {
    console.log('applyFormValues isFromArray = ', isFromArray);
    console.log('applyFormValues group = ', group);
    console.log('applyFormValues formValues = ', formValues);
    

    for (var key in group.controls) {

      if (group.controls.hasOwnProperty(key)) {
        console.log(key + " -> " + group.controls[key]);
        let formControl = group.controls[key];

        if (formControl instanceof FormArray) {
          
          console.log('Updating values for FormArray ' + key + '', formControl, formValues[key]);

          let count = 1;
          for (var i in formValues[key]) {
            console.log('subGroups in FormArray = ', formValues[key][i]);
            this.applyFormValues(formControl.controls[0], formValues[key][i], count);
            count++;
          }
        } else if (formControl instanceof FormGroup) {
          console.log('Updating values for FormGroup ' + key + ' = ', formControl);
          if (formValues[key]) {
            this.applyFormValues(formControl, formValues[key], 0);
          }
        } else {
          console.log('Updating values for formControl ' + key + ' = ', formControl);
          if (formValues.hasOwnProperty(key) && formValues[key] != undefined) {
            if (isFromArray > 0) {
              (<FormArray>group.controls[isFromArray]).push(formControl.setValue(formValues[key]));
            } else {
              formControl.setValue(formValues[key]);
            }
          }
        }
      }
    }

  }

  ngOnInit() {
    let self = this;
    let cDocKey = self._route.snapshot.paramMap.get('cDocKey');
    console.log('cDocKey =', cDocKey);
    let cNum = self._route.snapshot.paramMap.get('cNum');
    console.log('cNum  =', cNum);
    let docId = self._route.snapshot.paramMap.get('docId');
    console.log('docId  =', docId);

    
    self.listOfColl = self._af.database.list(`/${cNum}`);
    self.docOfCocs = self._af.database.object(`/c3/${cDocKey}`);
    console.log('self.docOfCocs = ', self.docOfCocs);
    console.log('self.listOfColl = ', self.listOfColl);

    let docToUpdate = self._af.database.object(`/${cNum}/${docId}`);
    console.log('docToUpdate = ', docToUpdate);

    self.docOfCocs.subscribe(
      function(cocsRecord) {
        // create class from json and assign to form
        let { fbg, lf} = self.getFormControlGroup(cocsRecord['fields']);
        self.docForm = fbg;
        console.log('docForm = ', self.docForm);
        self.fields.push(lf);
        // get the values and assign to form
        docToUpdate.subscribe(
          function (docToUpdateRecord) {
            console.log('docToUpdateRecord = ', docToUpdateRecord);
            self.applyFormValues(self.docForm, docToUpdateRecord, 0);

          } /* function (docToUpdateRecord) */
        ); /* docToUpdate.subscribe */

      } /* function(cocsRecord)  */
    ); /* self.docOfCocs.subscribe */
    
  } // ngOnInit

  onSubmit(model: FormGroup) {
    this.listOfColl.push(model.value);
    console.log('model = ', model)
  } // onSubmit
}
