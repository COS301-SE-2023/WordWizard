import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'word-wizard-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})

export class PasswordPage {
  password =  '';

  constructor(private router: Router) {}

  isPasswordValid(): boolean {
    return /^\d{4}$/.test(this.password);
  }

  setPassword(): void {
    if (this.isPasswordValid()) {
      this.router.navigate(['/child']);
    }
  }

}
