import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ReadingPage } from './reading.page';
import { ReadingRouting } from './reading.routing';
import { RouterModule } from '@angular/router';

import { SharedUiModule } from '@word-wizard/app/shared-ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadingRouting,
    RouterModule,
    SharedUiModule,

  ],
  declarations: [ReadingPage],
})
export class ReadingModule { }
