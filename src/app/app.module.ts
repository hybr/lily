
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

//import { MaterialModule } from '@angular/material';
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

/* Prime Ng modules */
import { ToolbarModule, DialogModule, DataListModule } from 'primeng/primeng';
import { ButtonModule, SplitButtonModule, ListboxModule } from 'primeng/primeng';
import { DataTableModule, SharedModule, MultiSelectModule } from 'primeng/primeng';
import { TooltipModule, PanelModule } from 'primeng/primeng';

import { DbTableRecordsService } from './db/service';
import { DbTablesComponent } from './db/db_tables';
import { DbUserComponent } from './db/user';
import { DbPersonComponent, } from './db/person';
import { DbPhoneComponent, } from './db/phone';

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

		AlertComponent,
		LoadingComponent,
		DebugComponent,
		
		DbUserComponent, DbPersonComponent, DbPhoneComponent,

		DbTablesComponent
	],
	providers: [
		DbTableRecordsService
	],
	imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule, 

		FormsModule,
		ReactiveFormsModule ,

		//MaterialModule.forRoot(),

		HttpModule, JsonpModule,

		ToolbarModule, DialogModule, ButtonModule, DataListModule,
		SplitButtonModule, DataTableModule,	SharedModule, MultiSelectModule,
		TooltipModule, PanelModule, ListboxModule,
		
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
