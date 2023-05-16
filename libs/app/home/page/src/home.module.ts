import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { HomeRouting } from './home.routing';

@NgModule({
  imports: [CommonModule, IonicModule, HomeRouting],
  declarations: [HomePage],
})
export class HomeModule {}
