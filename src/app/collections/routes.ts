import { Routes } from '@angular/router';

import { ListDocsOfCocsComponent } from './list.component';
import { DetailDocOfCocsComponent } from './detail.component';
import { AddDocInCocsComponent } from './add.component';

import { CreateTableRecordComponent } from './create-table-record/create-table-record.component';
import { UpdateTableRecordComponent } from './update-table-record/update-table-record.component';

export const CollectionComponentRoutes: Routes = [
	/* { path: 'cocs/new', component: AddDocInCocsComponent }, // C */
	
	{ path: 'cocs/list', component: ListDocsOfCocsComponent }, // R
	{ path: 'cocs/show/:key', component: DetailDocOfCocsComponent }, // R
	
	/* { path: 'cocs/edit/:key', component: AddDocInCocsComponent }, // U
	{ path: 'cocs/remove/:key', component: AddDocInCocsComponent }, // D
	*/

	{ path: 'ac/new/:cNum', component: CreateTableRecordComponent },
	{ path: 'ac/update/:cNum/:docId', component: UpdateTableRecordComponent },

];
