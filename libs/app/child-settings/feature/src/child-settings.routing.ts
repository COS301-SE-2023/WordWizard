import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildSettingsPage } from './child-settings.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ChildSettingsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildSettingsRouting {}
