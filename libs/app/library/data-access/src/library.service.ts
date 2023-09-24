import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  VocabRequest,
  PracticeRequest,
  UpdateRequest,
} from './requests/library.requests';
import { WordList } from './interfaces/library.interfaces';
import { UpdateResponse } from './responses/library.responses';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  constructor(private http: HttpClient) {}

  getVocab(request: VocabRequest): Observable<WordList> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<WordList>(
      `${process.env['WW_API_ENDPOINT']}/library/vocab`,
      request,
      { headers },
    );
  }

  addVocab(request: UpdateRequest) : Observable<UpdateResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<UpdateResponse>(
      `${process.env['WW_API_ENDPOINT']}/library/vocab/add`,
      request,
      { headers },
    );
  }

  getPractice(request: PracticeRequest): Observable<WordList> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<WordList>(
      `${process.env['WW_API_ENDPOINT']}/library/practice`,
      request,
      { headers },
    );
  }

  UpdatePractice(request: UpdateRequest): Observable<UpdateResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<UpdateResponse>(
      `${process.env['WW_API_ENDPOINT']}/library/practice/remove`,
      request,
      { headers },
    );
  }
}
