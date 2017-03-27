import { Routes } from '@angular/router';

import { FormComponent } from './form.component';
import { FormListComponent } from './list.component';
import { FormDetailComponent } from './detail.component';

export const FormComponentRoutes: Routes = [
  { path: 'form/:key', component: FormDetailComponent },
  { path: 'form', component: FormListComponent }
  
];
