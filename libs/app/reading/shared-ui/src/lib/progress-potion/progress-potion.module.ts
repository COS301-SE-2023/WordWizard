import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProgressPotionComponent } from './progress-potion.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [ProgressPotionComponent],
  exports: [ProgressPotionComponent],
})
export class ProgressPotionModule {}
