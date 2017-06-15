
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

/* forms */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* local storage */
import { LocalStorageModule } from 'angular-2-local-storage';

/* Routing */
import { routing } from './app.routes';

/* authentication */
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

/* Application Components */
import { AppComponent } from './app.component';
import { WebPageComponent } from './views/web-page/web-page.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { AlertComponent } from './views/alert/alert.component';
import { LoadingComponent } from './views/loading/loading.component';
import { DebugComponent } from './views/debug/debug.component';

import { ListComponent } from './db/list/list.component';
import { UpdateComponent } from './db/update/update.component';
import { TableRecordComponent } from './db/table-record/table-record.component';
import { GroupFieldComponent } from './db/group-field/group-field.component';
import { FieldComponent } from './db/field/field.component';
import { FieldPropertyComponent } from './db/field-property/field-property.component';
import { CreateComponent } from './db/create/create.component';
import { RemoveComponent } from './db/remove/remove.component';
import { DbUserComponent } from './db/user/user.component';


import { DbTableRecordsService } from './db/service';
import { DbTablesComponent } from './db/db_tables';
import { TableRecordsComponent } from './db/table_records';

const firebaseConfig = {
	apiKey: 'AIzaSyDRGd4HFZkgmseHrokr2Jv5hXIkoPNugy0',
	authDomain: 'ia2f-5d2b6.firebaseapp.com',
	databaseURL: 'https://ia2f-5d2b6.firebaseio.com',
	storageBucket: 'ia2f-5d2b6.appspot.com',
	messagingSenderId: '288539084670'
};

@NgModule({
	declarations: [
		AppComponent,
		WebPageComponent,
		PageNotFoundComponent,
		TableRecordComponent,
		ListComponent,
		AlertComponent,
		LoadingComponent,
		UpdateComponent,
		DebugComponent,
		GroupFieldComponent,
		FieldComponent,
		FieldPropertyComponent,
		CreateComponent,
		RemoveComponent,
		DbUserComponent,
		
		DbTablesComponent,
		TableRecordsComponent
	],
	providers: [
		DbTableRecordsService
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule ,

		MaterialModule.forRoot(),
		BrowserAnimationsModule,

		HttpModule, JsonpModule,

		AngularFireModule.initializeApp (firebaseConfig),
		AngularFireAuthModule,
		AngularFireDatabaseModule,

		LocalStorageModule.withConfig({
			prefix: 'app-root',
			storageType: 'localStorage'
		}),
		routing
	],
	
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
