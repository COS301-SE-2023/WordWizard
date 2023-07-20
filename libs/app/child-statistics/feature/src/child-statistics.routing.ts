import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildStatisticsPage } from './child-statistics.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ChildStatisticsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildStatisticsRouting {}