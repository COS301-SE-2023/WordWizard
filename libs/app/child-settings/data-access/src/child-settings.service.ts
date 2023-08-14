import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  DeleteChildRqst,
  EditChildRqst,
} from './requests/child-settings.requests';
import { status } from './responses/child-settings.responses';

@Injectable({
  providedIn: 'root',
})
export class ChildSettingsService {
  constructor(private readonly http: HttpClient) {}

  editChild(id: string, name: string, age: number, image: string) {
    const request: EditChildRqst = {
      child_id: id,
      name: name,
      age: age,
      profile_picture: image,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<status>(
      `${process.env['WW_API_ENDPOINT']}/child/edit-child`,
      request,
      { headers },
    );
  }

  deleteChild(id: string) {
    const request: DeleteChildRqst = {
      child_id: id,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<status>(
      `${process.env['WW_API_ENDPOINT']}/child/delete-child`,
      request,
      { headers },
    );
  }
}
