import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardPage } from './dashboard.page';
import { DashboardRouting } from './dashboard.routing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { AddChildService } from '@word-wizard/app/add-child/data-access';
import { ChildSettingsService } from '@word-wizard/app/child-settings/data-access';
import { StageService } from '@word-wizard/app/stage/data-access';
import { LoadingModule } from '@word-wizard/app/loading/feature';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardRouting,
    RouterModule,
    SharedUiModule,
    HttpClientModule,
    LoadingModule,
  ],
  declarations: [DashboardPage],
  providers: [AddChildService, ChildSettingsService, StageService],
})
export class DashboardModule {}
