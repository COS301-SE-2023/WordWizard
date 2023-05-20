import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CauldronComponent } from './cauldron.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [CauldronComponent],
  exports: [CauldronComponent],
})
export class CauldronModule {}
