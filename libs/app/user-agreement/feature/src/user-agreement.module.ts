import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appSplashFeatureRoutes } from './lib.routes';
import { UserAgreementPage } from './user-agreement.page';
import { UserAgreementRouting } from './user-agreement.routing';

import { SharedUiModule } from '@word-wizard/app/shared-ui';

@NgModule({
  imports: [
    CommonModule,
    UserAgreementRouting,
    // RouterModule.forChild(appUserAgreementFeatureRoutes)
    SharedUiModule,
  ],
  declarations: [UserAgreementPage],
  exports: [UserAgreementPage],
})
export class UserAgreementModule {}
