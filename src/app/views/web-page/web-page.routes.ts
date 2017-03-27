import { Routes } from '@angular/router';

import { WebPageComponent } from './web-page.component';

export const WebPageRoutes: Routes = [
  { path: 'web-page', component: WebPageComponent, data : {name : 'home'} },
  { path: 'web-page/:name', component: WebPageComponent }
];
