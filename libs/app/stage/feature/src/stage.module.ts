import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StagePage } from './stage.page';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [StagePage ],
  exports: [StagePage ]
})
export class StageModule {}
