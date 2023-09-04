import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HelpComponent } from './help.component';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  declarations: [HelpComponent],
  providers: [],
  exports: [HelpComponent],
})
export class HelpModule {}
