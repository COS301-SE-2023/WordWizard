import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import the request models and response models
import {
  SetPinRqst,
  ValidatePasswordRqst,
  PinRqst,
} from './requests/password.requests';
import { 
  SetPinRsp,
  PinRsp,
 } from './responses/password.responses';
@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  constructor(private readonly http: HttpClient) { }

  addPin(email: string, validationWord: string, passcode: string) {
    const request: SetPinRqst = {
      parent_email: email,
      new_pin: passcode,
      validation_word: validationWord,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<SetPinRsp>(
      `${process.env["WW_API_ENDPOINT"]}/pin/add-pin`,
      request,
      { headers },
    );
  }

  changePin(email: string, validationWord: string, passcode: string) {
    const request: SetPinRqst = {
      parent_email: email,
      new_pin: passcode,
      validation_word: validationWord,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<SetPinRsp>(
      `${process.env["WW_API_ENDPOINT"]}/pin/change-pin`,
      request,
      { headers },
    );
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
