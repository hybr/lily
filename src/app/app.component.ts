import { Component } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  user = {};

  constructor(private _af: AngularFire) {
      this._af.auth.subscribe(user => {
        if (user) {
          // user logged in
          this.user = user;
        } else {
          // user not logged in
          this.user = {};
        }
      });
  }

  login() {
      this._af.auth.login({
        provider: AuthProviders.Google,
        method: AuthMethods.Redirect
      });
  }

  logout() {
    this._af.auth.logout();
  }
}
