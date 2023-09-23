import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAgreementPage } from './user-agreement.page';
import { UserAgreementRouting } from './user-agreement.routing';
import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    UserAgreementRouting,
    SharedUiModule,
    IonicModule
  ],
  declarations: [UserAgreementPage],
  exports: [UserAgreementPage],
})
export class UserAgreementModule {}
