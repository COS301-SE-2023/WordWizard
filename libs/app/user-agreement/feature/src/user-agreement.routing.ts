import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAgreementPage } from './user-agreement.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserAgreementPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAgreementRouting {}
