
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from './service';

@Component({
  selector: 'validation-message',
  template: `<div 
    class="ui-message ui-messages-error ui-corner-all" 
    *ngIf="errorMessage !== null"
  >{{errorMessage}}</div>`
})
export class ValidationMessageComponent {

  private errorMessage: string;
  @Input() control: FormControl;
  
  constructor() { }

  getErrorMessage() {
    console.log('contorl = ', this.control);
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    
    return null;
  }
}