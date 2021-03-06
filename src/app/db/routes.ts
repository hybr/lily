import { Routes } from '@angular/router';

import { DbTablesComponent } from './db_tables';
import { DbUserComponent, } from './user';
import { DbPersonComponent, } from './person';
import { DbPhoneComponent, } from './phone';
import { DbWebPagesComponent, } from './web_page';
import { DbOrganizationComponent, } from './organization';
import { DbSeOperationDataComponent, } from './se_operation_data';

/*import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { RemoveComponent } from './remove/remove.component';*/

export const DbRoutes: Routes = [
	/* tsl = TableS  List */
	{ path: 'db/tsl', component: DbTablesComponent }, 

	{ path: 'db/users', component: DbUserComponent },
	{ path: 'db/people', component: DbPersonComponent },
	{ path: 'db/phones', component: DbPhoneComponent },
	{ path: 'db/web_pages', component: DbWebPagesComponent },
	{ path: 'db/organizations', component: DbOrganizationComponent },
	{ path: 'db/se_operation_data', component: DbSeOperationDataComponent },
	

/*	{ path: 'db/tl/:cNum', component: ListComponent }, */
	/* utr = Update Table (with number = cNum) Record (with id = docId) */
/*	{ path: 'db/utr/:cNum/:docId', component: UpdateComponent },*/
	/* utr = Remove Table (with number = cNum) Record (with id = docId) */
/*	{ path: 'db/rtr/:cNum/:docId', component: RemoveComponent },*/
	/* ctr = Create Table (with number = cNum) New Record */
/*	{ path: 'db/ctr/:cNum', component: CreateComponent } */
	
];
