import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { AuthService } from '@word-wizard/app/auth/data-access';
import { ChildState, Child } from '@word-wizard/app/child/data-access';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getMe().pipe(
      switchMap((data) => {
        if (data)
          return of(true);
        else {
          this.router.navigate(['/welcome']);
          return of(false);
        }
      }),
      catchError((error) => {
        this.router.navigate(['/welcome']);
        if (error.status === 401) 
          return of(false);
        else 
          return of(false);
      })
    );
  }

  constructor(private authService: AuthService, private router: Router) {}

}
