import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewChildPage } from './view-child.page';
import { ViewChildRouting } from './view-child.routing';
import { IonicModule } from '@ionic/angular';
import { SharedUiModule } from '@word-wizard/app/shared-ui';

@NgModule({
  imports: [
    CommonModule,
    // RouterModule.forChild(appViewChildFeatureRoutes)
    ViewChildRouting,
    IonicModule,
    SharedUiModule,
  ],
  declarations: [ViewChildPage],
  exports: [ViewChildPage],
})
export class ViewChildModule {}
