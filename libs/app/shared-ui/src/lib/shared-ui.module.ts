import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { MicrophoneModule } from './microphone';
import { SpeakerModule } from './speaker';
import { ExitModule } from './exit';
import { HeaderModule } from './header'
import { InfoModule } from './info';

@NgModule({
  imports: [CommonModule, IonicModule, MicrophoneModule, SpeakerModule, HeaderModule, ExitModule, InfoModule],
  declarations: [],
  exports: [MicrophoneModule, SpeakerModule, ExitModule, InfoModule, HeaderModule],
=======
import { MicrophoneModule } from './microphone/microphone.module';
import { SpeakerModule } from './speaker/speaker.module';
import { InfoModule } from './info';
import { HeaderModule } from './header/header.module';


@NgModule({
  imports: [CommonModule, IonicModule, MicrophoneModule, SpeakerModule, HeaderModule, InfoModule],
  exports: [MicrophoneModule, SpeakerModule, InfoModule, HeaderModule],

>>>>>>> dev
})
export class SharedUiModule {}
