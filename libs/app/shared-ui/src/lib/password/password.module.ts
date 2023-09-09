import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PasswordService } from '@word-wizard/app/password/data-access';
import { PasswordComponent } from './password.component';
import { ButtonModule } from '../button';

@NgModule({
  imports: [ 
    CommonModule, 
    FormsModule, 
    IonicModule, 
    ReactiveFormsModule, 
    ButtonModule,
    HttpClientModule
  ],
  declarations: [PasswordComponent],
  exports: [PasswordComponent],
  providers: [PasswordService]
})
export class PasswordModule {}
