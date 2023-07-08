import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AwardSection } from '../src/achievement.model';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  constructor(private http: HttpClient) { }

  getAwards(userId: string): Observable<AwardSection[]> {
    const requestPayload = { userID: userId };
    return this.http.post<AwardSection[]>( `${process.env}`, requestPayload);
  }
}
