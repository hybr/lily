
import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, } from 'angularfire2';
import { ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { CollectionOfCollections } from './model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-collection-addincall',
  templateUrl: './addInColl.component.html',
  styleUrls: [ './style.component.css' ]
})
export class AddDocInCollComponent implements OnInit {
  public recordStructure: Array<any> = <any>[];
  public recordValues: Object = {};
  public record: Object = {};

  public listOfCollToUpdate: FirebaseListObservable<any[]>;
  public docOfCocs: FirebaseObjectObservable<CollectionOfCollections>;

  public submitted: boolean = false;

  private route : Router;

  constructor(
    private _af: AngularFire,
    private _route: ActivatedRoute,
    private _lss: LocalStorageService,
    private _location: Location
  ) {}

  removeSubFieldL1(i, fieldName) {
    this.recordValues[fieldName].splice(i, 1);
  }

  addSubFieldL1(fieldName, subFields) {
    console.log('Received ',fieldName,'for add = ', subFields);

    console.log('L1 to be inserted in container before = ', this.recordValues[fieldName]);

    if (this.recordValues[fieldName] == undefined) {

      this.recordValues[fieldName] = [];
/*      if (this.recordValues[fieldName]['sub_fields'] == undefined) {
         this.recordValues[fieldName]['sub_fields'] = [];
      }*/
    }
    
    this.recordValues[fieldName].push({'sub_fields': subFields});
    this.recordValues[fieldName]['type'] = 'obj';

    console.log('L1 container after = ', this.recordValues);

  }

  addSubFieldL2(parentFieldName, fieldName, subFields) {
    console.log('Received ',parentFieldName, ' -> ', fieldName, ' for add = ', subFields);

    if (this.recordValues[parentFieldName] == undefined) {
      this.recordValues[parentFieldName] = {'sub_fields' : []};

      
        
      
        if (this.recordValues[parentFieldName]['sub_fields'][fieldName] == undefined) {
          this.recordValues[parentFieldName]['sub_fields'][fieldName] = [];

/*          if (this.recordValues[parentFieldName][fieldName]['sub_fields'] == undefined) {
               this.recordValues[parentFieldName][fieldName]['sub_fields'] = [];
            }*/
        
        }
      
    }
    
    this.recordValues[parentFieldName]['sub_fields'][fieldName].push({'sub_fields': subFields});

    console.log('L2 container after = ', this.recordValues);
  }


  createRecordStructureFromC3Table(cocsRecord) {
    console.log('cocsRecord received = ', cocsRecord);

    let localFields: Array<any> = <any>[];

    let sequence = 1;
    for (var property in cocsRecord['sub_fields'] ) {
      

      let field = cocsRecord['sub_fields'][property];

      console.log('field of ', property, ' = ', field);

      let fName = property;
      if (field['name']) {
        fName = field['name'];
      }

      let fDefaultValue = '';
      if (field['default_value']) {
        fDefaultValue = field['default_value'];
      }

      let fType = 'string';
      if (field['type']) {
        fType = field['type'];
      }

      let fTitle = property.split('_').map(i => i[0].toUpperCase() + i.substr(1).toLowerCase()).join(' ');
      if (field['title']) {
        fTitle = field['title'];
      }

      let fSequence = sequence;
      sequence++;
      if (field['sequence']) {
        fSequence = field['sequence'];
      }

      let fSubFields = [];
      if (fType == 'obj' && field['sub_fields']) {
        fSubFields = this.createRecordStructureFromC3Table(
          field
        );
      }
      localFields.push({
        'name' : fName,
        'title' : fTitle,
        'default_value': fDefaultValue,
        'type': fType,
        'sub_fields': fSubFields,
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

    
    self.listOfCollToUpdate = self._af.database.list(`/${cNum}`);
    console.log('self.listOfCollToUpdate = ', self.listOfCollToUpdate);

    self.docOfCocs = self._af.database.object(`/c3/${cDocKey}`);
    console.log('self.docOfCocs = ', self.docOfCocs);

    self.docOfCocs.subscribe(
      function(cocsRecord) {
        self.record = cocsRecord;
        // create class from json and assign to form
        self.recordStructure = self.createRecordStructureFromC3Table(cocsRecord);
        // TODO check if this is issue with formbuilder
        console.log('after createRecordStructureFromC3Table self.recordStructure = ', self.recordStructure);

      } /* function(cocsRecord)  */
    ); /* self.docOfCocs.subscribe */
    
  } // ngOnInit

  onSubmit() {
    this.listOfCollToUpdate.push(this.recordValues);
    // this.route.navigateByUrl('/cocs/list');
    this._location.back();
  } // onSubmit
}
