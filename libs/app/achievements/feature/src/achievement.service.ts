import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Award, AwardSection } from './achievement.model';

@Injectable()
export class AchievementService {
  private baseUrl = 'https://your-backend-api.com'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getAwards(): Observable<AwardSection[]> {
    const url = `${this.baseUrl}/achievements/practice`; // Replace with your API endpoint
    return this.http.get<AwardSection[]>(url);
  }
}
