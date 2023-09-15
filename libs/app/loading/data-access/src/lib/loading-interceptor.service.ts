import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor {

  constructor(private loadingService: LoadingService, private readonly cookieServie: CookieService) {}

  intercept(
    // eslint-disable-next-line
    request: HttpRequest<any>,
    next: HttpHandler
    // eslint-disable-next-line
  ): Observable<HttpEvent<any>> {

    if((!request.url.includes(process.env['WW_AUTH0_DOMAIN'] as string))){
      this.loadingService.show();

      // const cookies = document.cookie.split('; ');
      // const tokenCookie = cookies.find(cookie => cookie.startsWith('authToken='));
      // const token = tokenCookie ? tokenCookie.split('=')[1] : null;
      const token = this.cookieServie.get('authToken');

      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          },
        });
      }

      return next.handle(request).pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
    }


    return next.handle(request);

  }
}
