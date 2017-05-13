
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

import { DetailDocOfCocsComponent } from './collections/detail.component';

import { RecordFieldComponent } from './collections/record-field/record-field.component';
import { RecordFieldGroupComponent } from './collections/record-field-group/record-field-group.component';
import { TableRecordComponent } from './collections/table-record/table-record.component';
import { CreateTableRecordComponent } from './collections/create-table-record/create-table-record.component';
import { UpdateTableRecordComponent } from './collections/update-table-record/update-table-record.component';
import { RemoveTableRecordComponent } from './collections/remove-table-record/remove-table-record.component';
import { ListDatabaseTablesComponent } from './collections/list-database-tables/list-database-tables.component';
import { ListComponent } from './db/list/list.component';
import { AlertComponent } from './views/alert/alert.component';
import { LoadingComponent } from './views/loading/loading.component';
import { UpdateComponent } from './db/update/update.component';

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
    DetailDocOfCocsComponent,
    RecordFieldComponent,
    RecordFieldGroupComponent,
    TableRecordComponent,
    CreateTableRecordComponent,
    UpdateTableRecordComponent,
    RemoveTableRecordComponent,
    ListDatabaseTablesComponent,
    ListComponent,
    AlertComponent,
    LoadingComponent,
    UpdateComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
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
  
  bootstrap: [ AppComponent ]
})
export class AppModule { }
