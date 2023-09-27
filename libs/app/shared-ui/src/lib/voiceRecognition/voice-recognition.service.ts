/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoiceRecognitionService {
  convertSpeechToText(file: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, 'audio.wav');
    return this.http.post(
      `${process.env['WW_API_ENDPOINT']}/speech/speech-to-text`,
      formData,
    );
  }
  constructor(private http: HttpClient) {}
}
/* eslint:enable */
