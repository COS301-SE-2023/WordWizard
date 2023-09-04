import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewChildPage } from './view-child.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ViewChildPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewChildRouting {}
