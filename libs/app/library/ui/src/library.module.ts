import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ScrollModule } from './scroll';


@NgModule({
  imports: [
    CommonModule, 
    IonicModule,
    ScrollModule, 
  ],
  declarations: [],
  exports: [ 
    ScrollModule, 
  ],
})
export class LibraryModule {}