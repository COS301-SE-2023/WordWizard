import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MicrophoneModule } from './microphone/microphone.module';
import { SpeakerModule } from './speaker/speaker.module';
import { InfoModule } from './info';
import { HeaderModule } from './header/header.module';
import { ButtonModule } from './button';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MicrophoneModule,
    SpeakerModule,
    HeaderModule,
    InfoModule,
    ButtonModule,
  ],
  exports: [
    MicrophoneModule,
    SpeakerModule,
    InfoModule,
    HeaderModule,
    ButtonModule,
  ],
})
export class SharedUiModule {}
