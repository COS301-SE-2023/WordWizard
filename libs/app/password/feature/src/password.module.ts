import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PasswordPage } from './password.page';
import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { IonicModule } from '@ionic/angular';
import { ReadingSharedUiModule } from '@word-wizard/app/reading/shared-ui';
import { PasswordRoute } from './password.routing';
import { FormsModule } from '@angular/forms';
import { PasswordService } from '@word-wizard/app/password/data-access';
import { LoadingModule } from '@word-wizard/app/loading/feature';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedUiModule,
    IonicModule,
    ReadingSharedUiModule,
    PasswordRoute,
    FormsModule,
    LoadingModule,
  ],
  declarations: [PasswordPage],
  exports: [PasswordPage],
  providers: [PasswordService],
})
export class PasswordModule {}
