import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScrollComponent } from './scroll.component';
import { SharedUiModule } from '@word-wizard/app/shared-ui'

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedUiModule],
  declarations: [ScrollComponent],
  exports: [ScrollComponent],
})
export class ScrollModule {}
