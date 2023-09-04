import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VoiceRecognitionService } from '../voiceRecognition/voice-recognition.service';
import { IonicModule } from '@ionic/angular';

import { MicrophoneComponent } from './microphone.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [MicrophoneComponent],
  exports: [MicrophoneComponent],
  providers: [VoiceRecognitionService],
})
export class MicrophoneModule {}
