
import { Component, Input } from '@angular/core';
import { AppCommon } from '../common';

@Component({
  selector: 'validation-api-message',
  template: `
    <div 
      *ngIf="goodMessage && goodMessage !== ''" 
      class="ui-message ui-corner-all ui-messages-success"
    >
      API: {{goodMessage}}
    </div>

    <div 
      *ngIf="errorMessage && errorMessage !== ''" 
      class="ui-message ui-messages-error ui-corner-all"
    >
      API: Can not process. Please check following :
      <ul>
        <li *ngFor="let error of keysOfObject(errorMessage)">
          {{error}} : 
          <span *ngIf="isVariableObject(errorMessage[error])">
            <ul>
              <li  *ngFor="let subError of keysOfObject(errorMessage[error])">
                <span *ngIf="isVariableObject(errorMessage[error][subError])">
                  <ul>
                  <li  *ngFor="let subSubError of keysOfObject(errorMessage[error][subError])">
                    {{subError}} : {{errorMessage[error][subError][subSubError]}}
                  </li>
                  </ul>
                </span>
                <span *ngIf="!isVariableObject(errorMessage[error][subError])">
                  {{subError}} : {{errorMessage[error][subError]}}
                </span>
              </li>
            </ul>
          </span>
          <span *ngIf="!isVariableObject(errorMessage[error])">
            {{errorMessage[error]}}
          </span>
        </li>
      </ul>
    </div>
  `
})
export class ValidationApiMessageComponent extends AppCommon {

  @Input() goodMessage: string;
  @Input() errorMessage: string;

  constructor() { 
    super();
  }
}