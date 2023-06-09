import { Injectable } from '@angular/core';
import { GetChildrenRqst } from './requests/child.requests';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Child } from './interfaces/child.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  constructor(private readonly http: HttpClient) { }
  getChildren(email: string, name: string) {
    const request : GetChildrenRqst = {
      parent_email: email,
      parent_name: name
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Child[]>(`${process.env['WW_API_ENDPOINT']}/child`, request, { headers });
  }
}
