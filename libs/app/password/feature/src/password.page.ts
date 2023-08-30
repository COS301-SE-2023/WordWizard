import { Component } from '@angular/core';
import { Router } from '@angular/router';





import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

}
