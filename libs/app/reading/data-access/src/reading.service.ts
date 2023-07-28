import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Content,
} from './interfaces/reading.interfaces';
import {
  PassageRequest, UpdateProgressRequest,
} from './requests/reading.request';

@Injectable({
  providedIn: 'root'
})
export class ReadingService {
  constructor(private http:HttpClient) {}

   getPassage(request: PassageRequest): Observable<Content> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Content>(`${process.env['WW_API_ENDPOINT']}/reading/passage`, request, { headers });
  }

   updateProgress(request: UpdateProgressRequest) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    // console.error('updateProgress', request);
    return this.http.post<Content>(`${process.env['WW_API_ENDPOINT']}/reading/update-progress`, request, { headers });
  }

}
