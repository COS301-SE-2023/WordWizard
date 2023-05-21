import { Component } from '@angular/core';

@Component({
  selector: 'ww-microphone',
  templateUrl: './microphone.component.html',
  styleUrls: ['./microphone.component.scss'],
})
export class MicrophoneComponent {
  isRecording = false;
  
  startRecording(): void {
    console.log('Start recording');
    this.isRecording = true;
  }

  stopRecording(): void {
    console.log('Stop recording');
    this.isRecording = false;
  }

  getButtonClass(): string {
    return this.isRecording ? 'microphone-button active' : 'microphone-button';
  }
}
