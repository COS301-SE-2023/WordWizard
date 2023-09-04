import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordComponent } from './password.component';
import { ButtonModule } from '../button';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, ReactiveFormsModule, ButtonModule],
  declarations: [PasswordComponent],
  exports: [PasswordComponent]
})
export class PasswordModule {}
