import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';

// Route Configuration
export const PageNotFoundRoutes: Routes = [
  { path: 'page-not-founde', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];