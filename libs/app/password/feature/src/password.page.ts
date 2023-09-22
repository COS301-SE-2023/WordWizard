import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordService } from '@word-wizard/app/password/data-access';
import { ChildState, Child, SetPassword } from '@word-wizard/app/child/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
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
  back = "../manage-children";
  title = 'Set Password';

  @Select(ChildState.passcode) passcode$!: Observable<string>;
  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;
  constructor(
    private router: Router, 
    private readonly passwordService: PasswordService, 
    private cookieService: CookieService,
    private store: Store,) {
    this.passcode$.subscribe((passcode) => {
      if (passcode === '') {
        this.title = 'Set Passcode';
        this.back = '';
      } else
        this.title = 'Change Passcode';
    });
    this.parent_email = cookieService.get('email');
  }
  
  isPasswordValid(): boolean {
    return /^\d{4}$/.test(this.password);
  }

  setPassword(): void {
    if (this.isPasswordValid()) {
      this.passcode$.subscribe((passcode) => {
        if (passcode === '') {
          this.passwordService.addPin(this.parent_email, this.validationWord, this.password).subscribe((res) => {
            if (res.status_code) {
              this.store.dispatch(new SetPassword({ passcode: this.password}));
              this.router.navigate(['/manage-children']);
            } else {
              alert(res.message);
            }
          });
        }
        else {
          this.passwordService.changePin(this.parent_email, this.validationWord, this.password).subscribe((res) => {
            if (res.status_code) {
              this.store.dispatch(new SetPassword({ passcode: this.password}));
              this.router.navigate(['/manage-children']);
            } else {
              alert(res.message);
            }
          });
        }
      }).unsubscribe();
    }
  }
}
