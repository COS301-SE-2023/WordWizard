import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordRouting } from './forgot-password.routing';
import { ForgotPasswordPage } from './forgot-password.page';
import { AuthService } from '@word-wizard/app/auth/data-access';
import { LoadingModule } from '@word-wizard/app/loading/feature';
@NgModule({
  imports: [CommonModule, ForgotPasswordRouting, HttpClientModule, IonicModule, ReactiveFormsModule, LoadingModule],
  declarations: [ForgotPasswordPage],
  providers: [AuthService]
})
export class ForgotPasswordModule {}
