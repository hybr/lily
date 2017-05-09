import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  user: Observable<firebase.User>;

  constructor(private _af: AngularFireAuth) {
      this.user = _af.authState;
  }

  login() {
    this._af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this._af.auth.signOut();
  }
}
