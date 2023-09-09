import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordService } from '@word-wizard/app/password/data-access';
import { ChildState, Child } from '@word-wizard/app/child/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'word-wizard-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})

export class PasswordPage {
  password =  '';
  validationWord = '';
  parent_email = '';

  constructor(private router: Router, private readonly passwordService: PasswordService, private readonly auth: AuthService, private cookieService: CookieService,) {
    this.auth.idTokenClaims$.subscribe((claims) => {
      if (claims) {
        const idToken = claims.__raw;
        this.cookieService.set('authToken', idToken, undefined, undefined, undefined, true, 'Strict');
      }
    });

    this.auth.user$.subscribe((user) => {
      if (user) {
        this.parent_email = user?.email || '';
      }
    });
  }
  
  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;


  
  isPasswordValid(): boolean {
    return /^\d{4}$/.test(this.password);
  }


  setPassword(): void {
    if (this.isPasswordValid()) {
      this.passwordService.changePin(this.parent_email, this.validationWord, this.password).subscribe((res) => {
        if (res.status_code) {
          this.router.navigate(['/child']);
        } else {
          alert(res.message);
        }
      });
    }
  }
}
