import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddChildRqst } from './requests/add-child.requests';
import { status } from './responses/add-child.responses';
import { images } from './interfaces/add-child.interfaces';
import { Child } from '@word-wizard/app/child/data-access';

@Injectable({
  providedIn: 'root'
})
export class AddChildService {

  constructor(private readonly http: HttpClient) { }

  addChild(parentName: string, parentEmail: string, name: string, age: number, image: string) {
    const request: AddChildRqst = {
      parent_email: parentEmail,
      parent_name: parentName,
      name: name,
      age: age,
      profile_picture: image
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Child>(`${process.env['WW_API_ENDPOINT']}/add-child`, request, { headers });
  }

  getImages() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<images>(`${process.env['WW_API_ENDPOINT']}/add-child`,{ headers });
  }
}
