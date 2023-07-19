import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LessonCoinComponent } from './lesson-coin.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [LessonCoinComponent ],
  exports: [LessonCoinComponent ]
})
export class LessonCoinModule {}
