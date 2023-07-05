import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingRouting } from './loading.routing';
import { LoadingPage } from './loading.page';
import { SharedUiModule } from '@word-wizard/app/shared-ui';

@NgModule({
  imports: [CommonModule, LoadingRouting, RouterModule, SharedUiModule],
  declarations: [LoadingPage],
  exports: [LoadingPage],
})
export class LoadingModule {}
