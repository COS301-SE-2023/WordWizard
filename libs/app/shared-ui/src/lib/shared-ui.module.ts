import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MicrophoneModule } from './microphone/microphone.module';
import { SpeakerModule } from './speaker/speaker.module';

@NgModule({
  imports: [CommonModule, IonicModule, MicrophoneModule, SpeakerModule],
  declarations: [],
  exports: [MicrophoneModule, SpeakerModule],
})
export class SharedUiModule {}
