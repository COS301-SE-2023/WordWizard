import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AchievementPage } from './achievement.page';
import { AchievementRouting } from './achievement.routing';
import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { HttpClientModule } from '@angular/common/http';
import { AchievementService } from '@word-wizard/app/achievements/data-access';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AchievementRouting,
    SharedUiModule,
    HttpClientModule,
  ],
  declarations: [AchievementPage],
  providers: [AchievementService],
})
export class AchievementModule {}

//deploycommit
