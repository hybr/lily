import { Routes } from '@angular/router';
import { DetailDocOfCocsComponent } from './detail.component';
import { CreateTableRecordComponent } from './create-table-record/create-table-record.component';
import { UpdateTableRecordComponent } from './update-table-record/update-table-record.component';
import { RemoveTableRecordComponent } from './remove-table-record/remove-table-record.component';
import { ListDatabaseTablesComponent } from './list-database-tables/list-database-tables.component';

export const CollectionComponentRoutes: Routes = [
	{ path: 'cocs/list', component: ListDatabaseTablesComponent },
	{ path: 'cocs/show/:key', component: DetailDocOfCocsComponent },
	{ path: 'ac/new/:cNum', component: CreateTableRecordComponent },
	{ path: 'ac/update/:cNum/:docId', component: UpdateTableRecordComponent },
	{ path: 'ac/remove/:cNum/:docId', component: RemoveTableRecordComponent }
];
