import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AchievementPage } from './achievement.page';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [AchievementPage ],
  exports: [AchievementPage ]
})
export class AchievementModule {}
