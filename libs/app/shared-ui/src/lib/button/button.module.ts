import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from './button.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
})
export class ButtonModule {}
