import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AchievementPage } from './achievement.page';
import { AchievementRouting } from './achievement.routing';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, AchievementRouting],
  declarations: [AchievementPage ],
  exports: [AchievementPage ]
})
export class AchievementModule {}
