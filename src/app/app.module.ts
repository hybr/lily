

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

/* Angular Material */
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import {MdCardModule} from '@angular/material/card';
import {MdButtonModule} from '@angular/material/button';
import {MdIconModule} from '@angular/material/icon';
import {MdIconRegistry} from '@angular/material/icon';
import {MdToolbarModule} from '@angular/material/toolbar';

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
import { FormComponent } from './form/form.component';

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
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, JsonpModule,
    MaterialModule, MdToolbarModule,
    AngularFireModule.initializeApp (firebaseConfig, {
        provider: AuthProviders.Google,
        method: AuthMethods.Popup
    }),
    routing
  ],
  providers: [ MdIconRegistry ],
  bootstrap: [AppComponent]
})
export class AppModule { }
