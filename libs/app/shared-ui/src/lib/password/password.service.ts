import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  constructor(private http: HttpClient) {}

  getPin(): Observable<any> {
    return this.http.get(`${process.env["WW_ENDPOINT"]}/pin`);
  }
}
