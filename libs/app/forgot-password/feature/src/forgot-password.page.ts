import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SHA256 } from 'crypto-js';
import { AuthService } from '@word-wizard/app/auth/data-access';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'word-wizard-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  form!: FormGroup;
  pin!: FormGroup
  submitted = false;
  code = '';
  constructor(
    private readonly fb: FormBuilder, 
    private readonly auth: AuthService, 
    private readonly router: Router,
    private readonly toastController: ToastController,
  ) { 
    this.form = this.fb.group({
      email: ['', Validators.required]
    });
    this.pin = this.fb.group({
      pin: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  submit() {
    this.submitted = true;
    if(this.form.valid) {
      this.auth.forgotPassword(this.form.value.email).subscribe(
        // eslint-disable-next-line
        (response: any) => {
          this.code = response.code;
        }
      );
    }
  }

  clearInput() {
    this.form.reset();
    this.submitted = false;
  }

  submitPin() {
    if(this.code === SHA256(this.pin.value.pin).toString()){
      if(this.pin.value.password !== this.pin.value.confirmPassword) {
        this.presentToast('Password does not match', 'danger')
        return;
      }
      this.auth.resetPassword(this.form.value.email, this.pin.value.password, this.pin.value.pin).subscribe((res: any) => {
        this.presentToast('Password reset successfully', 'success')
        this.router.navigate(['/login']);
      })
    }
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}
