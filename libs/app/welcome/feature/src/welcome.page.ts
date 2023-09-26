import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'word-wizard-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {
  constructor(private readonly router: Router, private readonly cookieService: CookieService) {
    if(this.cookieService.get('email') && this.cookieService.get('authToken')) {
      this.router.navigate(['/manage-children']);
    }
  }
}
