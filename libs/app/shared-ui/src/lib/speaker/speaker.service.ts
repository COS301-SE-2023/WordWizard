import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeakerService {
  constructor(private http: HttpClient) {}

  getAudio(text: string): Observable<Blob> {
    return this.http.post(
      `${process.env['WW_API_ENDPOINT']}/speech/text-to-speech`,
      { text: text },
      { responseType: 'blob' },
    );
  }
}
