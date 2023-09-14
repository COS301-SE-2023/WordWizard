import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRouting } from './login.routing';
import { LoginPage } from './login.page';

@NgModule({
  imports: [CommonModule, LoginRouting],
  declarations: [LoginPage],
  exports: [LoginPage],
})
export class AppLoginFeatureModule {}
