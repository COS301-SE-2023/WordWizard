import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'ww-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  @Input() visible = false;
  pin!:string;
  otpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.otpForm = this.fb.group({
      otp1: [''],
      otp2: [''],
      otp3: [''],
      otp4: [''],
    });
    //Backend call to get pin
    this.pin = "1234";
  }

  controlModal() {
    this.visible = !this.visible;
  }

  //eslint-disable-next-line
  move(e:any, p:any, c:any, n:any) {
    if(e.key === 'Backspace') {
      if(p != '')
        p.focus();
    } else {
      if(n != '')
        n.focus()
      else {
        if(this.otpForm.value.otp1 + this.otpForm.value.otp2 + this.otpForm.value.otp3 + this.otpForm.value.otp4 == this.pin)
          this.visible = false;
      }
    }
  }
}
