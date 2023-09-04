import { Injectable } from '@angular/core';
import { GetChildrenRqst, deleteAccountRqst } from './requests/child.requests';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Child, DeleteAccountRsps } from './interfaces/child.interfaces';
import { AuthService} from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class ChildService {
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
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

  deleteAccount(email: string) {
    const request: deleteAccountRqst = {
      parent_email: email,
    };

    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(cookie => cookie.startsWith('authToken='));
    const token = tokenCookie ? tokenCookie.split('=')[1] : null;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post<DeleteAccountRsps>(
      `${process.env['WW_API_ENDPOINT']}/parent/delete`,
      request,
      { headers },
    );
  }

  async deleteAuthAccount() {
    try {
      const accessToken = await this.authService.getAccessTokenSilently();
      this.authService.user$.subscribe((user) => {
        if (!user) {
          return;
        }
        const userId = user.sub;
        const apiUrl = `https://${process.env['WW_AUTH0_DOMAIN']}/api/v2/users/${userId}`;
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${accessToken}`,
        );
        this.http.delete(apiUrl, { headers });
        this.authService.logout();
      });
    } catch (error) {
      console.error(error);
    }
  }
}
