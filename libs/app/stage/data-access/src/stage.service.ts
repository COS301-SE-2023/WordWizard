import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stageRequest, stage } from './interfaces/stage.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  endpoint = "http://127.0.0.1:8000/stage";

  constructor(private http:HttpClient) {}

  getStage(rqst:stageRequest): Observable<stage> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const tempEndpoint = this.endpoint + "/getStage";

    //return static data for now, placeholder for when backend is ready

    const tempStage: stage = {
      name: 'Stage 1',
      levels: [3, 3, 2, 1, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      background: 'assets/images/stage1.png'
    }

    return new Observable<stage>(observer => {
      observer.next(tempStage);
      observer.complete();
    });

    return this.http.post<stage>(tempEndpoint, rqst, {headers});

  }

}
