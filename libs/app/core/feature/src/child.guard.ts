import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { ChildState, Child } from '@word-wizard/app/child/data-access';

@Injectable({
  providedIn: 'root'
})
export class ChildGuard implements CanActivate {
  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.currentChild$.pipe(
      switchMap((data) => {
        if (data._id !== '')
          return of(true);
        else {
          this.router.navigate(['/manage-children']);
          return of(false);
        }
      }),
      catchError((error) => {
        this.router.navigate(['/manage-children']);
        if (error.status === 401) 
          return of(false);
        else 
          return of(false);
      })
    );
  }

  constructor( private router: Router) {}

}
