import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MicrophoneModule } from './microphone/microphone.module';
import { SpeakerModule } from './speaker/speaker.module';
import { InfoModule } from './info';
import { HeaderModule } from './header/header.module';

@NgModule({
  imports: [CommonModule, IonicModule, MicrophoneModule, SpeakerModule, HeaderModule, InfoModule],
  exports: [MicrophoneModule, SpeakerModule, InfoModule, HeaderModule]

})
export class SharedUiModule {}
