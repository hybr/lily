import { Routes } from '@angular/router';

import { ActivityListComponent } from './list.component';
import { ActivityDetailComponent } from './detail.component';
import { ActivityAddComponent } from './add.component';


export const ActivityComponentRoutes: Routes = [
  { path: 'activity/new', component: ActivityAddComponent },
  { path: 'activity/:key', component: ActivityDetailComponent },
  { path: 'activities', component: ActivityListComponent }
  
];
