import { Component, OnInit } from '@angular/core';

import { Form } from './form';
import { FormDataService } from './form-data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: [ './form.component.css' ],
  providers: [ FormDataService ]
})
export class FormComponent implements OnInit {

  newDocument: Form = new Form();

  constructor(
    private formDataService: FormDataService
  ) {
  }

  toggleObsolete(document) {
    this.formDataService.toggleObsolete(document);
  }

  add() {
    this.formDataService.add(this.newDocument);
    /* empty the current document */
    this.newDocument = new Form();
  }

  remove(document) {
    this.formDataService.remove(document);
  }

  getAll() {
    return this.formDataService.getAll();
  }

  ngOnInit() {
  }

}
