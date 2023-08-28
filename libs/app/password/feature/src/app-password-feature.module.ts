import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appPasswordFeatureRoutes } from './lib.routes';
import { PasswordPage } from './lib/password.page';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(appPasswordFeatureRoutes)],
  declarations: [PasswordPage],
  exports: [PasswordPage],
})
export class AppPasswordFeatureModule {}
