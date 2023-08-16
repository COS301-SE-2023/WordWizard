import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stage } from './interfaces/stage.interface';
import { Observable } from 'rxjs';
import { levelsRequest } from './requests/stage.requests';
@Injectable({
  providedIn: 'root',
})
export class StageService {
  constructor(private http: HttpClient) {}

  getStage(rqst: levelsRequest): Observable<stage> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<stage>(
      `${process.env['WW_API_ENDPOINT']}/stage/get-levels`,
      rqst,
      { headers },
    );
  }
}
