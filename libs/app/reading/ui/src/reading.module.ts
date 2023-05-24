import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProgressPotionModule } from './progress-potion';

@NgModule({
  imports: [CommonModule, IonicModule, ProgressPotionModule],
  declarations: [],
  exports: [ProgressPotionModule],
})
export class ReadingModule {}
