import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InfoComponent } from './info.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [InfoComponent ],
  exports: [InfoComponent ]
})
export class InfoModule {}
