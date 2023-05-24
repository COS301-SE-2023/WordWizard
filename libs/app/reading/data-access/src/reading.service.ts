import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Vocab
} from './interfaces/reading.interfaces';
import {
  ReadingRequest
} from './requests/reading.request';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
  // Add more headers as required
});

@Injectable({
  providedIn: 'root'
})
export class ReadingService {

  endpoint = "http://127.0.0.1:8000/vocab";

  constructor(private http:HttpClient) {}

    getVocab(request: ReadingRequest):Observable<Vocab>{
      console.table(request);
      return this.http.post<Vocab>(this.endpoint, request, {headers});
    }

}
