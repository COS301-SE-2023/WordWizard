import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  constructor(private readonly http: HttpClient) { }

  addPin(p: any): Observable<any> {
    return this.http.post(`${process.env["WW_API_ENDPOINT"]}/pin/add-pin`, { p });
  }

  changePin(p: any): Observable<any> {
    return this.http.post(`${process.env["WW_API_ENDPOINT"]}/pin/change-pin`, { p });
  }

  validateWord(p: any): Observable<any> {
    return this.http.post(`${process.env["WW_API_ENDPOINT"]}/pin/validate-word`, { p });
  }

  validatePin(p: any): Observable<any> {
    return this.http.post(`${process.env["WW_API_ENDPOINT"]}/pin/validate-pin`, { p });
  }

  getPin(p:any):Observable<any>{
    return this.http.post(`${process.env["WW_API_ENDPOINT"]}/pin/get-pin`, { p });
  }
}
