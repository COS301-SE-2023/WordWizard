import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { LessonCoinModule } from './lesson-coin/lesson-coin.module';

@NgModule({
  imports: [CommonModule, IonicModule, LessonCoinModule],
  exports: [LessonCoinModule],
})
export class LocalSharedUi {}
