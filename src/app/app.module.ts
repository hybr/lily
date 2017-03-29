
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

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

import { CollectionDetailComponent } from './collections/detail.component';
import { CollectionListComponent } from './collections/list.component';
import { CollectionAddComponent } from './collections/add.component';

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
    CollectionDetailComponent,
    CollectionListComponent,
    CollectionAddComponent
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
    routing
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
