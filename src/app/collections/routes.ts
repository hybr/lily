import { Routes } from '@angular/router';

import { ListDocsOfCocsComponent } from './list.component';
import { DetailDocOfCocsComponent } from './detail.component';

import { CreateTableRecordComponent } from './create-table-record/create-table-record.component';
import { UpdateTableRecordComponent } from './update-table-record/update-table-record.component';
import { RemoveTableRecordComponent } from './remove-table-record/remove-table-record.component';

export const CollectionComponentRoutes: Routes = [
	{ path: 'cocs/list', component: ListDocsOfCocsComponent }, // R
	{ path: 'cocs/show/:key', component: DetailDocOfCocsComponent }, // R

	{ path: 'ac/new/:cNum', component: CreateTableRecordComponent },
	{ path: 'ac/update/:cNum/:docId', component: UpdateTableRecordComponent },
	{ path: 'ac/remove/:cNum/:docId', component: RemoveTableRecordComponent }
];
