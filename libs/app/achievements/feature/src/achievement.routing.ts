import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchievementPage } from './achievement.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AchievementPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AchievementRouting {}
