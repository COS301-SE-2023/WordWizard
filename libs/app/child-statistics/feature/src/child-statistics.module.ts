import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChildStatisticsService } from '@word-wizard/app/child-statistics/data-access';
import { CommonModule } from '@angular/common';
import { ChildStatisticsRouting } from './child-statistics.routing';
import { ChildStatisticsPage } from './child-statistics.page';
import { IonicModule } from '@ionic/angular';
import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { NgxsModule } from '@ngxs/store';
import { ChildState, ChildService } from '@word-wizard/app/child/data-access';

@NgModule({
  imports: [
    CommonModule,
    ChildStatisticsRouting,
    IonicModule,
    SharedUiModule,
    NgxsModule.forFeature([ChildState]),
    HttpClientModule,
  ],
  declarations: [ChildStatisticsPage],
  providers: [ChildStatisticsService, ChildService],
})
export class ChildStatisticsModule {}
