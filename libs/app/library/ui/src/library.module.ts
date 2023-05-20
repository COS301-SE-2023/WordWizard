import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ScrollModule } from './scroll';
import { CauldronModule } from './cauldron';


@NgModule({
  imports: [
    CommonModule, 
    IonicModule,
    ScrollModule,
    CauldronModule 
  ],
  declarations: [],
  exports: [ 
    ScrollModule,
    CauldronModule 
  ],
})
export class LibraryModule {}