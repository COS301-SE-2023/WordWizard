import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePage } from './welcome.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRouting {}
