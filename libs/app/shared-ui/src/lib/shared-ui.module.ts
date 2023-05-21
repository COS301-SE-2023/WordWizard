import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MicrophoneModule } from './microphone';
import { SpeakerModule } from './speaker';
import { ExitModule } from './exit';
import { HeaderModule } from './header'

@NgModule({
  imports: [CommonModule, IonicModule, MicrophoneModule, SpeakerModule, HeaderModule, ExitModule],
  declarations: [],
  exports: [MicrophoneModule, SpeakerModule, ExitModule, HeaderModule],
})
export class SharedUiModule {}
