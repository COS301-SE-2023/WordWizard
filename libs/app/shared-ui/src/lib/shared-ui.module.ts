import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MicrophoneModule } from './microphone/microphone.module';
import { SpeakerModule } from './speaker/speaker.module';
import { InfoModule } from './info';

@NgModule({
  imports: [CommonModule, IonicModule, MicrophoneModule, SpeakerModule],
  declarations: [],
  exports: [MicrophoneModule, SpeakerModule, InfoModule],
})
export class SharedUiModule {}
