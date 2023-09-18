import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpPage } from './sign-up.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SignUpPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRouting {}
