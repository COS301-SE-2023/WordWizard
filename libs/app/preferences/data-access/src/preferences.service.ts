import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PreferenceResponse } from './responses/preferences.responses';
import { GetPreferencesReq } from './requests/preferences.requests';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor(private http: HttpClient) { }

  getPreferences(request: GetPreferencesReq): Observable<PreferenceResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<PreferenceResponse>(
      `${process.env['WW_API_ENDPOINT']}/child/get-preferences`,
      request,
      { headers },
    );
  }
}