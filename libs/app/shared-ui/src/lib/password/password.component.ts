import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'ww-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  @Input() visible = false;
  pin!:string;
  otpForm: FormGroup;
  @Output() correct = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private router: Router, private toastController: ToastController) {
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
          this.correct.emit();
        else {
          this.otpForm.patchValue({
            otp1: '', 
            otp2: '', 
            otp3: '', 
            otp4: '', 
          });
          this.presentToast();
        }
      }
    }
  }

  nav(route: string) {
    this.router.navigate([route])
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Incoorect Pin, Try again',
      duration: 2000,
      position: 'bottom',
      color: 'danger',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
        },
      ],
    });
    await toast.present();
  }
  
}
