import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'word-wizard-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {
  constructor(public auth: AuthService, private readonly router: Router, private readonly cookieService: CookieService) {
    if(this.cookieService.get('email') && this.cookieService.get('authToken')) {
      this.router.navigate(['/manage-children']);
    }
  }

  getStarted() {
    this.auth
      .loginWithRedirect({
        async openUrl(url: string) {
          return Browser.open({ url, windowName: '_self' });
        }
      })
      .subscribe();
  }
}
