import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildStatisticsRouting } from './child-statistics.routing';
import { ChildStatisticsPage } from './child-statistics.page';

@NgModule({
  imports: [
    CommonModule,
    ChildStatisticsRouting,
  ],
  declarations: [ChildStatisticsPage],
})
export class ChildStatisticsModule {}
