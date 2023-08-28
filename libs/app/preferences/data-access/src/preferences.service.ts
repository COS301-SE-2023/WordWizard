import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VocabResponse } from './responses/preferences.responses';
import { GetPreferencesReq } from './requests/preferences.requests';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor(private http: HttpClient) { }

  getVocab(request: GetPreferencesReq): Observable<VocabResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<VocabResponse>(
      `${process.env['WW_API_ENDPOINT']}/child/get-preferences`,
      request,
      { headers },
    );
  }
}