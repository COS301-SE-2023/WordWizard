import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StagePage } from './stage.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: StagePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StageRouting {

}
