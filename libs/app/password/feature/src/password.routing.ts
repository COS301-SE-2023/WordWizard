import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordPage } from './password.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PasswordPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordRoute {}