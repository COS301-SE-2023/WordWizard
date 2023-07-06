import { Injectable } from '@angular/core';
import { GetChildrenRqst } from './requests/child.requests';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Child } from './interfaces/child.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  constructor(private readonly http: HttpClient) { }
  getChildren(email: string) {
    const request : GetChildrenRqst = {
      email: email
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Child[]>(`${process.env['WW_API_ENDPOINT']}/add-child`, request, { headers });
    // return this.http.get<Child[]>(`${this.baseUrl}/children/${email}`);
  }
}
