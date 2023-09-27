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

  constructor(public voiceService: VoiceRecognitionService) {}

  async startRecording() {
    this.isRecording = true;
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
    this.mediaRecorder.stop((blob: Blob) => {
      this.stream.getAudioTracks().forEach((track) => track.stop());
      this.voiceService.convertSpeechToText(blob).subscribe((res: any) => {
        this.textChanged.emit(res.text);
      });
    });
  }

  recording() {
    if (this.isRecording) this.isRecording = false;
    else this.isRecording = true;
  }
}
