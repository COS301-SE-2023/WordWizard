import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChildStatisticsService {

  constructor(private readonly http: HttpClient) { }
}
