import { Routes } from '@angular/router';

import { CollectionListComponent } from './list.component';
import { CollectionDetailComponent } from './detail.component';
import { CollectionAddComponent } from './add.component';


export const CollectionComponentRoutes: Routes = [
  { path: 'collection/new', component: CollectionAddComponent },
  { path: 'collection/:key', component: CollectionDetailComponent },
  { path: 'collections', component: CollectionListComponent }
  
];
