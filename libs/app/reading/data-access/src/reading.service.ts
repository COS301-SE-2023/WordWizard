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

  endpoint = "http://127.0.0.1:8000/reading";

  constructor(private http:HttpClient) {}

   getPassage(request: PassageRequest): Observable<Content> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const tempEndpoint = this.endpoint + "/passage";
    return this.http.post<Content>(tempEndpoint, request, { headers });
  }

   updateProgress(request: UpdateProgressRequest) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const tempEndpoint = this.endpoint + "/update-progress";

    // Figure out if necessary to return something
    this.http.post<Content>(tempEndpoint, request, { headers });
  }

}
