import { Component, EventEmitter, Output } from '@angular/core';
import { VoiceRecognitionService } from '../voiceRecognition/voice-recognition.service';
import * as RecordRTC from 'recordrtc';
import { VoiceRecorder, RecordingData, GenericResponse } from 'capacitor-voice-recorder';
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




  constructor(public voiceService: VoiceRecognitionService) {
    VoiceRecorder.canDeviceVoiceRecord().then((result: GenericResponse) => console.log(result.value))
    VoiceRecorder.requestAudioRecordingPermission().then((result: GenericResponse) => console.log(result.value))
  }

  async startRecording() {

    this.isRecording = true;
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: 'audio',
      mimeType: 'audio/wav',
      numberOfAudioChannels: 1,
    });
    this.mediaRecorder.record();
    // VoiceRecorder.startRecording()
    // .then((result: GenericResponse) => console.warn(result.value))
    // .catch(error => console.log(error))
  }

  stopRecording() {
    this.isRecording = false;
    this.mediaRecorder.stop((blob: Blob) => {
      this.stream.getAudioTracks().forEach((track) => track.stop());
      this.voiceService.convertSpeechToText(blob).subscribe((res: any) => {
        this.textChanged.emit(res.text);
      });
    });
    // VoiceRecorder.stopRecording()
    // .then((result: RecordingData) => {
    //   console.log(result.value.mimeType);
    //   const base64Audio = result.value.recordDataBase64;

    //   // Decode the Base64 string to a Uint8Array
    //   const binaryData = atob(base64Audio);
    //   const arrayBuffer = new Uint8Array(binaryData.length);
    //   for (let i = 0; i < binaryData.length; i++) {
    //     arrayBuffer[i] = binaryData.charCodeAt(i);
    //   }
    //   const blob = new Blob([arrayBuffer],{type: 'audio/wav'});
    //   const audioElement = new Audio();
    //   audioElement.src = URL.createObjectURL(blob);

    //   this.voiceService.convertSpeechToText(binaryData).subscribe((res: any) => {
    //     this.textChanged.emit(res.text);
    //   });
    // })
    // .catch(error => console.log(error))
  }

  recording(){
    if(this.isRecording)
      this.isRecording = false;
    else
      this.isRecording = true;
  }
}
