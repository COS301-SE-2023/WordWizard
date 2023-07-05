import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingPage } from './loading.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoadingPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingRouting {}