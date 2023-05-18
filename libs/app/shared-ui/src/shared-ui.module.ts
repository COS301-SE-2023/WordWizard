import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MicrophoneComponent } from './lib/microphone/microphone.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [MicrophoneComponent],
  exports: [MicrophoneComponent],
})
export class SharedUiModule {}
