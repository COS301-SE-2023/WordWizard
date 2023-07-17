import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LocalSharedUi } from '@word-wizard/app/stage/shared-ui';
import { StagePage } from './stage.page';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { StageService, StageState } from '@word-wizard/app/stage/data-access';
import { StageRouting } from './stage.routing';
import { HttpClientModule } from '@angular/common/http';
import { SharedUiModule } from '@word-wizard/app/shared-ui';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, StageRouting, SharedUiModule, LocalSharedUi, RouterModule, HttpClientModule, NgxsModule.forFeature([StageState])],
  declarations: [StagePage],
  providers: [StageService]
})
export class StageModule {}
