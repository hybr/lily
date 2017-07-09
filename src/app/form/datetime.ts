
import { Component, Input } from '@angular/core';
import { AppFormCommon } from './common';

@Component({
  selector: 'form-datetime',
  template: `
	<div class="ui-grid-row lns_sub_fields_border">
	    <div class="ui-grid-col-12">
			<div [formGroup]="mainForm">
				<label style="font-weight: bolder;"
					[attr.for]="inputId"
				>{{singularlLabel}}</label>
				<p-calendar 
					[formControlName]="fieldControlName"
				    [id]="inputId"
				    [showIcon]="true"
				></p-calendar>
				<validation-message 
					[control]="validationControl"
					[formSubmitted]="submitClicked"
				></validation-message>
			</div>	   
	    </div>
	</div>
	`
})
export class FormDateTimeComponent extends AppFormCommon {
  constructor() { super(); }
}
