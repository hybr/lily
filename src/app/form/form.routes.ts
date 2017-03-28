import { Routes } from '@angular/router';

import { FormListComponent } from './list.component';
import { FormDetailComponent } from './detail.component';
import { FormAddComponent } from './add.component';


export const FormComponentRoutes: Routes = [
  { path: 'form/new', component: FormAddComponent },
  { path: 'form/:key', component: FormDetailComponent },
  { path: 'form', component: FormListComponent }
  
];
