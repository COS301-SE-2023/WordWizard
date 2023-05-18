import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MicrophoneComponent } from './microphone.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [MicrophoneComponent ],
  exports: [MicrophoneComponent ]
})
export class MicrophoneComponent Module {}
