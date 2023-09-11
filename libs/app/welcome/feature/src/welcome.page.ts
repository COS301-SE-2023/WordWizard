import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { Router } from '@angular/router';

@Component({
  selector: 'word-wizard-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {
  constructor(public auth: AuthService, private readonly router: Router) {}

  getStarted() {
    this.auth
      .loginWithRedirect({
        async openUrl(url: string) {
          console.log(url);
          return Browser.open({ url, windowName: '_self' });
        }
      })
      .subscribe();
  }
}
