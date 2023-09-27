import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
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
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator()]],
      confirmPassword: ['', Validators.required],
      acceptAgreement: [false, [Validators.required, this.mustBeTrueValidator]],
    });
    this.pin = this.fb.group({
      pin: ['', Validators.required]
    });
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const hasUppercase = /[A-Z]/.test(control.value);
      const hasLowercase = /[a-z]/.test(control.value);
      const hasNumber = /\d/.test(control.value);
      const hasSpecialChar = /[!@#$%^&*()_+{}\\[\]:;<>,.?~\\-]/.test(control.value);
      const isValid = hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
      return isValid ? null : { invalidPassword: true };
    };
  }
  //eslint-disable-next-line
  mustBeTrueValidator(control:any) {
    const value = control.value;
    if (value !== true)
      return { mustBeTrue: true };
    return null;
  }

  submit() {
    if(this.form.valid) {
      if(this.form.value.password == this.form.value.confirmPassword) {
        this.auth.verify(this.form.value.email.toLowerCase()).subscribe(
          // eslint-disable-next-line
          (response: any) => {
            this.submitted = true;
            this.code = response.code;
            this.form.value.acceptAgreement = false;
          },
          (error) => {
            this.presentCustomToast('Account with this email already exists', 'danger');
          }
        );
      }
      else
        this.presentCustomToast('Passwords do not match', 'danger');
    }
    else {
      if(this.form.get('password')?.hasError('invalidPassword'))
        this.presentCustomToast('Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.', 'danger');
      else
        this.presentCustomToast('Please ensure you have filled in all the fields', 'danger');
    }
  }

  clearInput() {
    this.form.reset();
    this.submitted = false;
  }

  submitPin() {
    if(this.code === SHA256(this.pin.value.pin).toString()){
      // eslint-disable-next-line
      this.auth.signUp(this.form.value.email.toLowerCase(), this.form.value.password).subscribe((res: any) => {
        this.cookieService.set("email", this.form.value.email.toLowerCase(), undefined, undefined, undefined, true, 'Strict');
        this.cookieService.set('authToken', res.access_token, undefined, undefined, undefined, true, 'Strict');
        this.form.reset();
        this.router.navigate(['/password'],{queryParams: {first: true}});
      });
    }
    else
      this.presentCustomToast('Invalid code', 'danger');
  }

  async presentCustomToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      color: color,
    });
    toast.present();
  }
}
