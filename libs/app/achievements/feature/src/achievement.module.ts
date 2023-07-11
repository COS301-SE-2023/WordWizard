import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AchievementPage } from './achievement.page';
import { AchievementRouting } from './achievement.routing';
import { SharedUiModule } from '@word-wizard/app/shared-ui';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, AchievementRouting, SharedUiModule],
  declarations: [AchievementPage ],
  exports: [AchievementPage ]
})
export class AchievementModule {}
