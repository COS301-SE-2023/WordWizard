import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PasswordComponent } from './password.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [PasswordComponent],
  exports: [PasswordComponent]
})
export class PasswordModule {}
