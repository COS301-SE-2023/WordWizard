/* eslint-disable */
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
declare let webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords!: string;
  wordChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) {
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-ZA';
    this.recognition.addEventListener('result', (e: any) => {
      const results = e.results;
      const interimTranscript = results[results.length - 1][0].transcript;
      const word = interimTranscript.trim();
      if (word.length > 0 && !word.includes(' ')) {
        this.tempWords = word;
        this.wordChanged.emit(this.tempWords);
      }
    })
  }

  start(){
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    this.recognition.addEventListener('end', (condition: any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
      } else {
        this.recognition.start();
      }
    })
  }

  stop(){
    this.isStoppedSpeechRecog = true;
    this.wordConcat();
    this.recognition.stop();
  }

  wordConcat() {
    this.text += this.tempWords + ' ';
    this.tempWords = '';
  }

  convertSpeechToText(file: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, 'audio.wav');
    return this.http.post(`${process.env["WW_API_ENDPOINT"]}speech/speech-to-text`, formData);
  }
}
/* eslint:enable */