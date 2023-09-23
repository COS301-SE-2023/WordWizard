import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SHA256 } from 'crypto-js';
import { AuthService } from '@word-wizard/app/auth/data-access';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'word-wizard-signup',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  form!: FormGroup;
  pin!: FormGroup
  submitted = false;
  code = '';
  constructor(
    private readonly fb: FormBuilder, 
    private readonly auth: AuthService, 
    private readonly router: Router,
    private readonly toastController: ToastController,
    private readonly cookieService: CookieService,
  ) { 
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    this.pin = this.fb.group({
      pin: ['', Validators.required]
    });
  }

  submit() {
    this.submitted = true;
    if(this.form.valid) {
      if(this.form.value.password == this.form.value.confirmPassword) {
        this.auth.verify(this.form.value.email).subscribe(
          // eslint-disable-next-line
          (response: any) => {
            this.code = response.code;
          },
          (error) => {
            this.presentToast();
            this.router.navigate(['/login']);
            this.clearInput();
          }
        );
      }
    }
  }

  clearInput() {
    this.form.reset();
    this.submitted = false;
  }

  submitPin() {
    if(this.code === SHA256(this.pin.value.pin).toString()){
      // eslint-disable-next-line
      this.auth.signUp(this.form.value.email, this.form.value.password).subscribe((res: any) => {
        // console.log(res);
        this.cookieService.set("email", this.form.value.email, undefined, undefined, undefined, true, 'Strict');
        this.cookieService.set('authToken', res.access_token, undefined, undefined, undefined, true, 'Strict');
        this.router.navigate(['/password']);
      });
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Account with this email already exists',
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }
}
