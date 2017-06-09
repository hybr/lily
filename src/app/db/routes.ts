import { Routes } from '@angular/router';

import { DbUserComponent } from './user/user.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { RemoveComponent } from './remove/remove.component';

export const DbRoutes: Routes = [
	{ path: 'db/user', component: DbUserComponent }, 

	/* tsl = TableS  List */
	{ path: 'db/tsl', component: ListComponent }, 
	{ path: 'db/tl/:cNum', component: ListComponent }, 
	/* utr = Update Table (with number = cNum) Record (with id = docId) */
	{ path: 'db/utr/:cNum/:docId', component: UpdateComponent },
	/* utr = Remove Table (with number = cNum) Record (with id = docId) */
	{ path: 'db/rtr/:cNum/:docId', component: RemoveComponent },
	/* ctr = Create Table (with number = cNum) New Record */
	{ path: 'db/ctr/:cNum', component: CreateComponent } 
	
];
