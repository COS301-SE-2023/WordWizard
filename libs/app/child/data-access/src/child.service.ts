import { Injectable } from '@angular/core';
import { GetChildrenRqst, deleteAccountRqst } from './requests/child.requests';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Child, DeleteAccountRsps } from './interfaces/child.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ChildService {
  constructor(
    private readonly http: HttpClient,
  ) {}
  getChildren(email: string, name: string) {
    const request: GetChildrenRqst = {
      parent_email: email,
      parent_name: name,
    };

    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(cookie => cookie.startsWith('authToken='));
    const token = tokenCookie ? tokenCookie.split('=')[1] : null;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post<Child[]>(
      `${process.env['WW_API_ENDPOINT']}/child`,
      request,
      { headers },
    );
  }

  deleteAccount() {
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(cookie => cookie.startsWith('authToken='));
    const token = tokenCookie ? tokenCookie.split('=')[1] : null;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<DeleteAccountRsps>(
      `${process.env['WW_API_ENDPOINT']}/delete`,
      { headers },
    );
  }
}
