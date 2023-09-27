import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingPage } from './loading.page';
import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { IonicModule } from '@ionic/angular';
import { ReadingSharedUiModule } from '@word-wizard/app/reading/shared-ui';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedUiModule,
    IonicModule.forRoot(),
    ReadingSharedUiModule,
  ],
  declarations: [LoadingPage],
  exports: [LoadingPage],
})
export class LoadingModule {}
