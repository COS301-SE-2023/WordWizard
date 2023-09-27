import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '@word-wizard/app/auth/data-access';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.getMe().pipe(
      switchMap((data) => {
        if (data) return of(true);
        else {
          this.router.navigate(['/welcome']);
          return of(false);
        }
      }),
      catchError((error) => {
        this.router.navigate(['/welcome']);
        if (error.status === 401) return of(false);
        else return of(false);
      }),
    );
  }

  constructor(private authService: AuthService, private router: Router) {}
}
