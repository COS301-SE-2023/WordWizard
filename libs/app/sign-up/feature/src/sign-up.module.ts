import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRouting } from './sign-up.routing';
import { SignUpPage } from './sign-up.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, SignupRouting, IonicModule],
  declarations: [SignUpPage],
})
export class SignUpModule {}
