import { Routes } from '@angular/router';

import { ListDocsOfCocsComponent } from './list.component';
import { DetailDocOfCocsComponent } from './detail.component';
import { AddDocInCocsComponent } from './add.component';

import { AddDocInCollComponent } from './addInColl.component';
import { UpdateDocInCollComponent } from './updateInColl.component';

export const CollectionComponentRoutes: Routes = [
	/* { path: 'cocs/new', component: AddDocInCocsComponent }, // C */
	
	{ path: 'cocs/list', component: ListDocsOfCocsComponent }, // R
	{ path: 'cocs/show/:key', component: DetailDocOfCocsComponent }, // R
	
	/* { path: 'cocs/edit/:key', component: AddDocInCocsComponent }, // U
	{ path: 'cocs/remove/:key', component: AddDocInCocsComponent }, // D
	*/

	{ path: 'ac/new/:cDocKey/:cNum', component: AddDocInCollComponent },
	{ path: 'ac/update/:cDocKey/:cNum/:key', component: UpdateDocInCollComponent },

];
