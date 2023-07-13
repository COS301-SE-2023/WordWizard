import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardPage } from './dashboard.page';
import { DashboardRouting } from './dashboard.routing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { AddChildService } from '@word-wizard/app/add-child/data-access';
import { ChildSettingsService } from '@word-wizard/app/child-settings/data-access';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardRouting,
    RouterModule,
    SharedUiModule,
    HttpClientModule
  ],
  declarations: [DashboardPage],
  providers: [AddChildService, ChildSettingsService]
  
})
export class DashboardModule { }