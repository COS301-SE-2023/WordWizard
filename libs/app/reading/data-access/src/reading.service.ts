import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Passage,
} from './interfaces/reading.interfaces';
import {
  PassageRequest,
} from './requests/reading.request';

@Injectable({
  providedIn: 'root'
})
export class ReadingService {

  endpoint = "http://127.0.0.1:8000/reading";

  constructor(private http:HttpClient) {}

   getPassage(request: PassageRequest): Observable<Passage> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const tempEndpoint = this.endpoint + "/passage";
    return this.http.post<Passage>(tempEndpoint, request, { headers });
  }

}
