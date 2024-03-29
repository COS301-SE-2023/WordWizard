import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService,
  ) {}

  signIn(email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const user = {
      username: email,
      password: password,
    };
    return this.http.post(`${process.env['WW_API_ENDPOINT']}/token`, user, {
      headers,
    });
  }

  getToken(username: string, password: string) {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(
      `${process.env['WW_API_ENDPOINT']}/token`,
      body.toString(),
      {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      },
    );
  }

  signUp(email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const user = {
      username: email,
      password: password,
    };
    return this.http.post(`${process.env['WW_API_ENDPOINT']}/sign-up`, user, {
      headers,
    });
  }

  login(email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const user = {
      username: email,
      password: password,
    };
    return this.http.post(`${process.env['WW_API_ENDPOINT']}/login`, user, {
      headers,
    });
  }

  getMe() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.cookieService.get('authToken')}`,
    });
    return this.http.get(`${process.env['WW_API_ENDPOINT']}/validate-token`, {
      headers,
    });
  }

  verify(email: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const user = {
      username: email,
      password: '',
    };

    return this.http
      .post(`${process.env['WW_API_ENDPOINT']}/verify`, user, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }),
      );
  }

  forgotPassword(email: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const user = {
      username: email,
      password: '',
    };

    return this.http
      .post(`${process.env['WW_API_ENDPOINT']}/forgot`, user, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }),
      );
  }

  resetPassword(email: string, password: string, code: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const user = {
      username: email,
      password: password,
      code: code,
    };

    return this.http
      .post(`${process.env['WW_API_ENDPOINT']}/reset`, user, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }),
      );
  }
}
