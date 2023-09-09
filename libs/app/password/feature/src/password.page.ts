import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordService } from '@word-wizard/app/password/data-access';


@Component({
  selector: 'word-wizard-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})

export class PasswordPage {
  password =  '';

  constructor(private router: Router, private readonly passwordService: PasswordService) {}

  isPasswordValid(): boolean {
    return /^\d{4}$/.test(this.password);
  }

  setPassword(): void {
    if (this.isPasswordValid()) {
      this.router.navigate(['/child']);
    }
  }

  //   from pydantic import BaseModel

// class SetPinReq(BaseModel):
//     parent_email: str
//     new_pin: str
// class ValidatePasswordReq(BaseModel):
//     parent_email: str
//     validation_word: str
// class SetPinRsp(BaseModel):
//     message: str
//     status_code: bool

// class PinReq(BaseModel):
//     parent_email: str

// class PinRsp(BaseModel):
//     pin: str


}
