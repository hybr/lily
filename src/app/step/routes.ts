import { Routes } from '@angular/router';

import { StepListComponent } from './list.component';
import { StepDetailComponent } from './detail.component';
import { StepAddComponent } from './add.component';


export const StepComponentRoutes: Routes = [
  { path: 'step/new', component: StepAddComponent },
  { path: 'step/:key', component: StepDetailComponent },
  { path: 'steps', component: StepListComponent }
  
];
