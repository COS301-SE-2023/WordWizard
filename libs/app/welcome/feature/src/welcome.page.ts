import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { Router } from '@angular/router';

@Component({
  selector: 'word-wizard-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit{
  constructor(public auth: AuthService, private readonly router: Router) {}

  getStarted() {
    this.auth
    .loginWithRedirect({
      async openUrl(url: string) {
        await Browser.open({ url, windowName: '_self' });
      }
    })
    .subscribe();
  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      // if (isAuthenticated) {
      //   this.router.navigate(['/library']);
      // }
    });

  }
  // This is an example of how to fetch the users information when needed
  // checkAuth() {
  //   this.auth.user$.subscribe((user) => {
  //     console.table(user);
  //     if (user) {
  //         console.error('user is logged in');
  //     } else {
  //         console.error('user is not logged in');
  //     }
  //   });
  // }
}
