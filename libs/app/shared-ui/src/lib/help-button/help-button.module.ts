import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HelpButtonComponent } from './help-button.component';
import { HelpModule } from '@word-wizard/app/help/feature';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HelpModule],
  declarations: [HelpButtonComponent],
  exports: [HelpButtonComponent],
})
export class HelpButtonModule {}
