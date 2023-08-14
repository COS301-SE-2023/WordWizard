import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageChildrenPage } from './manage-children.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ManageChildrenPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageChildrenRouting {}
