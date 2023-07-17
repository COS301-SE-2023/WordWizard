import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddChildPage } from './add-child.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AddChildPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddChildRouting {}
