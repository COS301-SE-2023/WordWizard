import { Component } from '@angular/core';
import { PasswordService } from '@word-wizard/app/password/data-access';
import { ChildState, Child, SetPassword } from '@word-wizard/app/child/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'word-wizard-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})

export class PasswordPage {
  password =  '';
  validationCode = '';
  parent_email = '';
  back = "../manage-children";
  title = 'Set Password';
  codeSent = false;
  code = '12345';
  change = false;

  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;
  constructor(
    private router: Router,
    private readonly passwordService: PasswordService,
    private cookieService: CookieService,
    private store: Store,
    public toastController: ToastController,
    private route: ActivatedRoute,
    ) {
    this.route.queryParams.subscribe(params => {
      if (params['first']) {
        this.title = 'Set Passcode';
        this.back = '';
      } else {
        this.title = 'Change Passcode';
        this.change = true;
        this.passwordService.updatePin().subscribe((res: any) => {
          this.code = res.code;
        })
      }
    });
    this.parent_email = cookieService.get('email');
  }

  isPasswordValid(): boolean {
    return /^\d{4}$/.test(this.password);
  }

  setPassword(): void {
    if(this.change) {
      if(this.validationCode == this.code) {
        const temp = this.password;
        this.passwordService.changePin(this.parent_email, this.validationCode, temp).subscribe((res) => {
          if (res.status_code) {
            this.store.dispatch(new SetPassword({ passcode: temp}));
            this.router.navigate(['/manage-children']);
            this.presentToast("PIN successfully changed!", "success");
          }
        });
        this.password = '';
      } else
        this,this.presentToast("Invalid code", "danger");
      this.validationCode = '';
    } else {
      if (this.password.length == 4 && this.password.indexOf(' ') < 0) {
        this.passwordService.addPin(this.parent_email, '', this.password).subscribe((res) => {
          if (res.status_code) {
            this.store.dispatch(new SetPassword({ passcode: this.password}));
            this.router.navigate(['/manage-children'], {queryParams: {first: true}});
            this.presentToast("PIN successfully set!", "success");
          }
        });
      }
      else {
        this.presentToast("Please enter a 4-digit PIN", "danger");
      }
    }
  }

  async presentToast(text: string, color: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  async changePassword() {
    this.passwordService.updatePin().subscribe((res: any) => {
      this.code = res.code;
      this.codeSent = true;
    });
  }
}
