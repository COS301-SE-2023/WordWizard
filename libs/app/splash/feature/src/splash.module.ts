import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appSplashFeatureRoutes } from './lib.routes';
import { SplashPage } from './splash.page';
import { SplashRouting } from './splash.routing';

@NgModule({
  imports: [
    CommonModule, 
    SplashRouting
    // RouterModule.forChild(appSplashFeatureRoutes)
  ],
  declarations: [SplashPage],
  exports: [SplashPage],
})
export class SplashModule {}
