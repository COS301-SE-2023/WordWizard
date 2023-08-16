import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoaderComponent } from './loader.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [LoaderComponent ],
  exports: [LoaderComponent ]
})
export class LoaderModule {}
