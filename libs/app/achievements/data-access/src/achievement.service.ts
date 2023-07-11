import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AwardSection } from './interfaces/achievements.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  constructor(private http: HttpClient) { }

  getAwards(userId: string): Observable<AwardSection[]> {
    const requestPayload = { child_id: userId };
    return this.http.post<AwardSection[]>( `${process.env['WW_API_ENDPOINT']}/achievements`, requestPayload);
  }
}
