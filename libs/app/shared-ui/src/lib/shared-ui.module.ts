import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MicrophoneModule } from './microphone/microphone.module';
import { SpeakerModule } from './speaker/speaker.module';
import { ExitModule } from './exit/exit.module';

@NgModule({
  imports: [CommonModule, IonicModule, MicrophoneModule, SpeakerModule],
  declarations: [],
  exports: [MicrophoneModule, SpeakerModule, ExitModule],
})
export class SharedUiModule {}
