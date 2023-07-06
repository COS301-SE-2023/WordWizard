import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardPage } from './dashboard.page';
import { DashboardRouting } from './dashboard.routing';
import { HttpClientModule } from '@angular/common/http';
// import { DashboardModule as DashboardUiModule }  from '@word-wizard/app/Dashboard/ui';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
// import { DashboardState, DashboardService } from '@word-wizard/app/library/data-access';
import { SharedUiModule } from '@word-wizard/app/shared-ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardRouting,
    RouterModule,
    // DashboardUiModule,
    // NgxsModule.forFeature([DashboardState]),
    SharedUiModule,
    HttpClientModule
  ],
  declarations: [DashboardPage],
  // providers: [DashboardService]
})
export class DashboardModule { }