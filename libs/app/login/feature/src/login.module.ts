import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRouting } from './login.routing';
import { LoginPage } from './login.page';

@NgModule({
  imports: [CommonModule, LoginRouting, IonicModule, ReactiveFormsModule],
  declarations: [LoginPage],
})
export class LoginModule {}
