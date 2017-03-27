import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebPageRoutes } from './views/web-page/web-page.routes';
import { PageNotFoundRoutes } from './views/page-not-found/page-not-found.routes';
import { FormComponentRoutes } from './form/form.routes';

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/web-page',
    pathMatch: 'full'
  },
  ...WebPageRoutes,
  ...FormComponentRoutes,
  ...PageNotFoundRoutes /* keep it as last route */
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
