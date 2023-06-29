import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {
  url = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  getAudio(text: string): Observable<Blob> {

    return this.http.post(
      `${this.url}/speech/text-to-speech`, 
      { text: text }, 
      { responseType: 'blob' }
    );
  }
}
