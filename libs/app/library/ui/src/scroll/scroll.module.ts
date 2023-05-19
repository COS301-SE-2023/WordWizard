import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScrollComponent } from './scroll.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ScrollComponent],
  exports: [ScrollComponent],
})
export class ScrollModule {}
