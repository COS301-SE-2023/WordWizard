import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MicrophoneModule } from './lib/microphone/microphone.module';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [MicrophoneModule],
  exports: [MicrophoneModule],
})
export class SharedUiModule {}
