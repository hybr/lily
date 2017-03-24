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
import {MdIconRegistry} from '@angular/material/icon'
import {MdToolbarModule} from '@angular/material/toolbar';

/* Application Components */
import { AppComponent } from './app.component';
import { WebPageComponent } from './views/web-page/web-page.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

/* Routing */
import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    WebPageComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, JsonpModule,
    MaterialModule, MdToolbarModule,
    routing
  ],
  providers: [ MdIconRegistry ],
  bootstrap: [AppComponent]
})
export class AppModule { }
