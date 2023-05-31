import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedUiModule } from '@word-wizard/app/stage/shared-ui';
import { StagePage } from './stage.page';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { StageState } from '@word-wizard/app/stage/data-access';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, SharedUiModule, RouterModule, NgxsModule.forFeature([StageState])],
  declarations: [StagePage ],
})
export class StageModule {}
