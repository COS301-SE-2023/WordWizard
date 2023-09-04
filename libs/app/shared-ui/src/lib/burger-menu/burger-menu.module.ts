import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BurgerMenuComponent } from './burger-menu.component';
import { HelpButtonModule } from '../help-button';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HelpButtonModule],
  declarations: [BurgerMenuComponent],
  exports: [BurgerMenuComponent],
})
export class BurgerMenuModule {}
