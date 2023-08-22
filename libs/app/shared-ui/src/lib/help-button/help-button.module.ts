import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HelpButtonComponent } from './help-button.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [HelpButtonComponent],
  exports: [HelpButtonComponent],
})
export class HelpButtonModule {}
