
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
  public listOfCollToUpdate: FirebaseListObservable<any[]>;
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

        let groupObject = self.getFormControlGroup(
          cocsRecord[property]['fields']
        );

        formFieldsGroup[property] = self._fb.array([
           groupObject.fbg
        ]);
        localFields.push({
          'name' : property,
          'title' : fTitle,
          'value': groupObject.lf,
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
        formFieldsGroup[property] = new FormControl(fValue, []);
      }

    } /* for */

    localFields.sort(function(a, b) { 
        return a.sequence - b.sequence;
    });

    return {fbg: self._fb.group(formFieldsGroup), lf: localFields};
  } /* getFormControlGroup */

  private applyFormValues (group, formValues, isFromArray) {
    console.log('-------------------------------------');
    console.log('applyFormValues isFromArray = ', isFromArray);
    console.log('applyFormValues group = ', group);
    console.log('applyFormValues formValues = ', formValues);

    let controls = group.controls;
    if (isFromArray>0) {
        controls = group['controls'][0]['controls'];
    }

    for (var mainGroupKey in controls) {
      console.log('=================', mainGroupKey + " -> ", controls[mainGroupKey]);

      if (controls[mainGroupKey] instanceof FormGroup) { /* checking controls[mainGroupKey] */

        for (var subGroupKey in controls[mainGroupKey]['controls']) {
          console.log('subGroups in FormGroup = ', formValues[mainGroupKey][subGroupKey]);
          controls[mainGroupKey]['controls'] = this.applyFormValues(
            controls[mainGroupKey]['controls'], 
            formValues[mainGroupKey][subGroupKey], 
            0
          );
        }

      } else if (controls[mainGroupKey] instanceof FormArray) { /* checking controls[mainGroupKey] */
      
        let count = 1;
        let controlsArray = [];
        for (var i in formValues[mainGroupKey]) {
          console.log('Element in FormArray = ', i, formValues[mainGroupKey][i], ' count = ', count);
          // self.docForm = self.applyFormValues(self.docForm, docToUpdateRecord, 0);
          controlsArray[count] = this.applyFormValues(
            controls[mainGroupKey], 
            formValues[mainGroupKey][i], 
            count
          );
           
          count++;
        }
        for (var j in controlsArray) {
           controls[mainGroupKey]['controls'][j] = controlsArray[j];
        }


      } else { /* checking controls[mainGroupKey] */
        
        console.log('Updating values for FormControl ' + mainGroupKey + ' = ', controls[mainGroupKey]);
        controls[mainGroupKey].setValue(formValues[mainGroupKey]);
      
      } /* checking controls[mainGroupKey] */

    } /* for (var mainGroupKey in controls) */


    return controls;
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
        let groupObject  = self.getFormControlGroup(cocsRecord['fields']);
        self.docForm = groupObject.fbg;
        console.log('docForm = ', self.docForm);
        self.fields.push(groupObject.lf);
        // get the values and assign to form
        docToUpdate.subscribe(
          function (docToUpdateRecord) {
            console.log('docToUpdateRecord = ', docToUpdateRecord);
            self.docForm = self.applyFormValues(self.docForm, docToUpdateRecord, 0);
            console.log('docForm after applying values from db = ', self.docForm);
          } /* function (docToUpdateRecord) */
        ); /* docToUpdate.subscribe */

      } /* function(cocsRecord)  */
    ); /* self.docOfCocs.subscribe */
    
  } // ngOnInit

  onSubmit(model: FormGroup) {
    this.listOfCollToUpdate.push(model.value);
    console.log('model = ', model)
  } // onSubmit
}
