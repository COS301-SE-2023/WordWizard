import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appManageChildrenFeatureRoutes } from './lib.routes';
import { ManageChildrenPage } from './manage-children.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appManageChildrenFeatureRoutes),
    RouterModule.forChild(appManageChildrenFeatureRoutes),
  ],
  declarations: [ManageChildrenPage],
  exports: [ManageChildrenPage],
})
export class AppManageChildrenFeatureModule {}
