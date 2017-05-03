import { Routes } from '@angular/router';

import { ListDocsOfCocsComponent } from './list.component';
import { DetailDocOfCocsComponent } from './detail.component';
import { AddDocInCocsComponent } from './add.component';

import { TableRecordComponent } from './table-record/table-record.component';
import { UpdateDocInCollComponent } from './updateInColl.component';

export const CollectionComponentRoutes: Routes = [
	/* { path: 'cocs/new', component: AddDocInCocsComponent }, // C */
	
	{ path: 'cocs/list', component: ListDocsOfCocsComponent }, // R
	{ path: 'cocs/show/:key', component: DetailDocOfCocsComponent }, // R
	
	/* { path: 'cocs/edit/:key', component: AddDocInCocsComponent }, // U
	{ path: 'cocs/remove/:key', component: AddDocInCocsComponent }, // D
	*/

	{ path: 'ac/new/:cDocKey/:cNum', component: TableRecordComponent },
	{ path: 'ac/update/:cDocKey/:cNum/:docId', component: UpdateDocInCollComponent },

];
