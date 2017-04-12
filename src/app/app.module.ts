
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

/* forms */
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

/* local storage */
import { LocalStorageModule } from 'angular-2-local-storage';

/* Routing */
import { routing } from './app.routes';

/* authentication */
import {
  AngularFireModule,
  AuthMethods,
  AuthProviders
} from 'angularfire2';

/* Application Components */
import { AppComponent } from './app.component';
import { WebPageComponent } from './views/web-page/web-page.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

import { ActivityDetailComponent } from './activity/detail.component';
import { ActivityListComponent } from './activity/list.component';
import { ActivityAddComponent } from './activity/add.component';

import { StepDetailComponent } from './step/detail.component';
import { StepListComponent } from './step/list.component';
import { StepAddComponent } from './step/add.component';

import { DetailDocOfCocsComponent } from './collections/detail.component';
import { ListDocsOfCocsComponent } from './collections/list.component';
import { AddDocInCocsComponent } from './collections/add.component';
import { AddDocInCollComponent } from './collections/addInColl.component';

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
    ActivityDetailComponent,
    ActivityListComponent,
    ActivityAddComponent,
    StepDetailComponent,
    StepListComponent,
    StepAddComponent,

    DetailDocOfCocsComponent,
    ListDocsOfCocsComponent,
    AddDocInCocsComponent,

    AddDocInCollComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule, JsonpModule,
    AngularFireModule.initializeApp (firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }),
    LocalStorageModule.withConfig({
      prefix: 'app-root',
      storageType: 'localStorage'
    }),
    routing
  ],

  bootstrap: [ AppComponent ]
})
export class AppModule { }
