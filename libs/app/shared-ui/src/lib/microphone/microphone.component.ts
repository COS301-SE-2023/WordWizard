import { Component, EventEmitter, Output } from '@angular/core';
import { VoiceRecognitionService } from '../voiceRecognition/voice-recognition.service';
@Component({
  selector: 'ww-microphone',
  templateUrl: './microphone.component.html',
  styleUrls: ['./microphone.component.scss'],
})
export class MicrophoneComponent {
  isRecording = false;

  @Output() textChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(public voiceService: VoiceRecognitionService) {
    this.voiceService.wordChanged.subscribe((word: string) => {
      this.textChanged.emit(word);
    });
  }
  
  startRecording(): void {
    this.isRecording = true;
  }

  recording(){
    if(this.isRecording){
      this.voiceService.stop();
      this.isRecording = false;
    }else{
      this.voiceService.start();
      this.isRecording = true;
    }
  }

  stopRecording(): void {
    this.isRecording = false;
  }

  getButtonClass(): string {
    return this.isRecording ? 'microphone-button active' : 'microphone-button';
  }
}
