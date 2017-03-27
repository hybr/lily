import { Routes } from '@angular/router';

import { FormComponent } from './form.component';

export const FormComponentRoutes: Routes = [
  { path: 'form', component: FormComponent, data : {number : 0} },
  { path: 'form/:number', component: FormComponent }
];
