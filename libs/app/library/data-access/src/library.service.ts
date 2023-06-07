import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VocabRequest, PracticeRequest } from './requests/library.requests';
import { WordList } from './interfaces/library.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) {}
  endpoint = "http://127.0.0.1:8000";

  getVocab(request: VocabRequest): Observable<WordList> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<WordList>(`${this.endpoint}/library/vocab`, request, { headers });
  }

  getPractice(request: PracticeRequest): Observable<WordList>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<WordList>(`${this.endpoint}/library/practice`, request, { headers });
  }
}
