import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './lib/button';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
})
export class SharedUiModule {}
