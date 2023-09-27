import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRouting } from './sign-up.routing';
import { SignUpPage } from './sign-up.page';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@word-wizard/app/shared-ui';
import { AuthService } from '@word-wizard/app/auth/data-access';
import { LoadingModule } from '@word-wizard/app/loading/feature';
@NgModule({
  imports: [
    CommonModule,
    SignupRouting,
    IonicModule,
    ReactiveFormsModule,
    ButtonModule,
    LoadingModule,
  ],
  declarations: [SignUpPage],
  providers: [AuthService],
})
export class SignUpModule {}
