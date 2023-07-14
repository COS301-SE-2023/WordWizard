import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StatisticsReq } from './requests/child-statistics.requests';
import { Statistics } from './responses/child-statistics.responses';

@Injectable({
  providedIn: 'root'
})
export class ChildStatisticsService {

  constructor(private readonly http: HttpClient) { }

  getStats(childId: string) {
    const request: StatisticsReq = {
      child_id : childId
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Statistics>(`${process.env['WW_API_ENDPOINT']}/statistics/get-stats`, request, { headers });
  }
}
