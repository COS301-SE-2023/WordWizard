import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildStatisticsRouting } from './child-statistics.routing';
import { ChildStatisticsPage } from './child-statistics.page';
import { IonicModule } from '@ionic/angular';
import { SharedUiModule } from '@word-wizard/app/shared-ui';

@NgModule({
  imports: [
    CommonModule,
    ChildStatisticsRouting,
    IonicModule,
    SharedUiModule,
  ],
  declarations: [ChildStatisticsPage],
})
export class ChildStatisticsModule {}
