import { Component, EventEmitter, Output } from '@angular/core';
import { VoiceRecognitionService } from '../voiceRecognition/voice-recognition.service';
import * as RecordRTC from 'recordrtc';
@Component({
  selector: 'ww-microphone',
  templateUrl: './microphone.component.html',
  styleUrls: ['./microphone.component.scss'],
})
export class MicrophoneComponent {
  isRecording = false;
  private mediaRecorder: any;
  private stream!: MediaStream;

  @Output() textChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() startRec: EventEmitter<void> = new EventEmitter<void>();
  @Output() stopRec: EventEmitter<void> = new EventEmitter<void>();


  constructor(public voiceService: VoiceRecognitionService) {
    this.voiceService.wordChanged.subscribe((word: string) => {
      this.textChanged.emit(word);
    });
  }

  async startRecording() {
    this.isRecording = true;
    // this.recording();
    this.startRec.emit();
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: 'audio',
      mimeType: 'audio/wav',
      numberOfAudioChannels: 1,
    });
    this.mediaRecorder.record();
  }

  stopRecording() {
    this.isRecording = false;
    this.stopRec.emit();
    // this.recording();
    this.mediaRecorder.stop((blob: Blob) => {
      const sampleRate = 44100; // Replace with your actual sample rate

// Calculate the duration in seconds
      const durationInSeconds = blob.size / (sampleRate * 2); // Assuming 16-bit audio

      // Convert the duration to minutes
      // const durationInMinutes = durationInSeconds / 60;

      console.error(`Recording duration: ${durationInSeconds} minutes`);
      this.stream.getAudioTracks().forEach((track) => track.stop());
      this.voiceService.convertSpeechToText(blob).subscribe((res: any) => {
        this.textChanged.emit(res.text);
      });
    });
  }
  
  // startRecording(): void {
  //   this.isRecording = true;
  // }

  recording(){
    if(this.isRecording){
      console.warn("start");
      this.voiceService.stop();
      this.isRecording = false;
    }else{
      console.error("Stop");
      this.voiceService.start();
      this.isRecording = true;
    }
  }

  // stopRecording(): void {
  //   this.isRecording = false;
  // }

  // getButtonClass(): string {
  //   return this.isRecording ? 'microphone-button active' : 'microphone-button';
  // }
}
