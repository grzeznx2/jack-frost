import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectUserRole } from 'src/app/store/auth';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectUserRole).pipe(
      map((role) => {
        if (role === 'USER') {
          return this.router.createUrlTree(['order-creator']);
        } else if (role === 'ADMIN') {
          return this.router.createUrlTree(['users']);
        } else {
          return this.router.createUrlTree(['login']);
        }
      })
    );
  }
}
