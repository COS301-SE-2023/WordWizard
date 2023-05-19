import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExitComponent } from './exit.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [ExitComponent ],
  exports: [ExitComponent ]
})
export class ExitModule {}
