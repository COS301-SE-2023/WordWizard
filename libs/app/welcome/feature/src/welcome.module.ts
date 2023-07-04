import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRouting } from './welcome.routing';
import { WelcomePage } from './welcome.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, WelcomeRouting, IonicModule],
  declarations: [WelcomePage],
})
export class WelcomeModule {}
