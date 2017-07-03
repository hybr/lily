
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from './service';

@Component({
  selector: 'validation-message',
  template: `<div 
    class="ui-message ui-messages-error ui-corner-all" 
    *ngIf="errorMessage !== ''"
  >{{errorMessage}}</div>`
})
export class ValidationMessageComponent {

  @Input() control: FormControl;
  @Input() formSubmitted: boolean;
  
  constructor() { }

  get errorMessage(): string {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && (this.control.dirty || this.formSubmitted)) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    return '';
  }
}