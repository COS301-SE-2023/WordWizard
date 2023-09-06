import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { BurgerMenuModule } from '../burger-menu';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule, BurgerMenuModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
