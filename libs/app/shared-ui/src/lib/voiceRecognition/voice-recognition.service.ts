import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoiceRecognitionService {
  constructor(private http: HttpClient) {}
  /*eslint-disable-next-line*/
  convertSpeechToText(file: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, 'audio.wav');
    return this.http.post(
      `${process.env['WW_API_ENDPOINT']}/speech/speech-to-text`,
      formData,
    );
  }
}
