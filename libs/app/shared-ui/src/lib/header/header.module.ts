import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {}
