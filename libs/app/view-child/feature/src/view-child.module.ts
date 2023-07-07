import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appViewChildFeatureRoutes } from './lib.routes';
import { ViewChildPage } from './view-child.page';
import { ViewChildRouting } from './view-child.routing';

@NgModule({
  imports: [
    CommonModule, 
    // RouterModule.forChild(appViewChildFeatureRoutes)
    ViewChildRouting
  ],
  declarations: [ViewChildPage],
  exports: [ViewChildPage],
})
export class ViewChildModule {}
