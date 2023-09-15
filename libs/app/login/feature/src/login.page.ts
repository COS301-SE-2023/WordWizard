import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@word-wizard/app/auth/data-access';

@Component({
  selector: 'word-wizard-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form!: FormGroup;
  constructor(private readonly fb: FormBuilder, private readonly auth: AuthService, private readonly router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    this.auth.getToken(this.form.value.email, this.form.value.password).subscribe(
      // eslint-disable-next-line
      (response: any) => {
        if(response.access_token) {
          this.router.navigate(['/manage-children']);
        }
      }
    );
  }
}
