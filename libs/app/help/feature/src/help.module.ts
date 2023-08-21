import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { HelpComponent } from './help.component';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, SharedUiModule],
  declarations: [HelpComponent],
  providers: [],
})
export class HelpModule {}
