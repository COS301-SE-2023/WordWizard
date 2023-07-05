import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddChildRqst } from './requests/add-child.requests';
import { status } from './responses/add-child.responses';

@Injectable({
  providedIn: 'root'
})
export class AddChildService {

  constructor(private readonly http: HttpClient) { }

  addChild(parentEmail: string, name: string, age: number, image: string) {
    const request: AddChildRqst = {
      parent_email: parentEmail,
      name: name,
      age: age,
      profile_picture: image
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<status>(`${process.env['WW_API_ENDPOINT']}/add-child`, request, { headers });
  }
}
