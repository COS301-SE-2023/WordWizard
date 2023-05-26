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
    // this.voiceService.init();
    this.voiceService.wordChanged.subscribe((word: string) => {
      this.textChanged.emit(word); // Log each word said
    });
  }
  
  startRecording(): void {
    console.log('Start recording');
    this.isRecording = true;

  }

  recording(){
    if(this.isRecording){
      this.voiceService.stop()
      this.isRecording = false;
    }else{
      this.voiceService.start()
      this.isRecording = true;
    }

  }

  stopRecording(): void {
    console.log('Stop recording');
    this.isRecording = false;
  }

  getButtonClass(): string {
    return this.isRecording ? 'microphone-button active' : 'microphone-button';
  }
}
