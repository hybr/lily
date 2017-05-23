import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';

export const DbRoutes: Routes = [
	/* tsl = TableS  List */
	{ path: 'db/tsl', component: ListComponent }, 
	{ path: 'db/tl/:cNum', component: ListComponent }, 
	/* utr = Update Table (with number = cNum) Record (with id = docId) */
	{ path: 'db/utr/:cNum/:docId', component: UpdateComponent },
	/* ctr = Create Table (with number = cNum) New Record */
	{ path: 'db/ctr/:cNum', component: CreateComponent } 
	
];
